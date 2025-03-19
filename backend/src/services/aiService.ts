import { OpenAI } from "openai";
import { LeadModel } from "../models/leadModel";
import { ActivityModel } from "../models/activityModel";
import { OPENAI_KEY } from "../env";
import { QueryTypes } from "sequelize";
import { getChatContext, saveChatContext } from "./chatContextService";

const openai = new OpenAI({ apiKey: OPENAI_KEY });

let contentMessage: string = "";

export const AIResponse = async (userQuery: string, sessionId: string): Promise<string> => {
  try {
    const greetings = [ 
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "greetings",
      "howdy",
      "yo",
      "what's up",
    ];

    const lowerQuery = userQuery.trim().toLowerCase();

    if (greetings.includes(lowerQuery)) {
      return "Hello! How can I assist you with your company leads today?";
    }

    // Step 1: Retrieve Context History for the session
    const chatHistory = await getChatContext(sessionId);

    // Step 2: Generate SQL Query from User Query
    const sqlQuery = await generateSQLQuery(userQuery); 

    if (!sqlQuery) {
      contentMessage = ` Previous conversation history: ${JSON.stringify(chatHistory, null, 2)}
       **User Query:** 
        ${userQuery}`;
    } else {
      // Step 3: Execute the Generated SQL Query
      const result = await executeSQLQuery(sqlQuery);
      if (!result) {
        return "No relevant data found.";
      }
      contentMessage = `You are an AI assistant providing insights about company leads.  

      Previous conversation history: ${JSON.stringify(chatHistory, null, 2)}

      Below is the SQL query generated to fetch the relevant data from the database:  

      **SQL Query:**  
      ${sqlQuery}  

      The database returned the following result:  
      ${JSON.stringify(result, null, 2)}  

      **User Query:**  
      "${userQuery}"  

      Please analyze the provided data and respond with a direct and concise answer to the user’s query. If the query result is numerical (such as a count), clearly state the number. If the query result includes specific lead details, summarize the key information. If no data is available, politely inform the user that no matching records were found.
      `;
    }

    // Step 4: Send Query and Context to OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant providing insights about company leads.",
        },
        ...chatHistory, // Include previous chat context
        {
          role: "user",
          content: contentMessage,
        },
      ],
    });

    const aiMessage = aiResponse.choices[0].message.content || "No response from AI.";

    // Step 5: Store Updated Context for Next Message
    await saveChatContext(sessionId, {
      role: "user",
      content: userQuery,
    });
    await saveChatContext(sessionId, {
      role: "assistant",
      content: aiMessage,
    });

    return aiMessage;
  } catch (error) {
    console.error("Error processing AI response:", error);
    return "An error occurred while processing your request.";
  }
};

// Function to generate SQL query from user query using OpenAI
const generateSQLQuery = async (userQuery: string): Promise<string | null> => {
  // Get actual table names
  const leadTable = LeadModel.getTableName(); // Likely 'LeadModels'
  const activityTable = ActivityModel.getTableName(); // Likely 'ActivityModels'

  const prompt = `Convert the following natural language query into a SQL query for an Azure SQL Database with tables:
- ${leadTable} (id, clientName, contactNo, clientEmail, currentStatus, source, createdAt)
- ${activityTable} (id, leadId, comment, timestamp, status)

Use the exact table names as given above in your SQL query.

User Query: "${userQuery}"
SQL Query:`;

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const sqlQuery = aiResponse.choices[0].message.content;
  return sqlQuery?.includes("SELECT") ? sqlQuery : null;
};

// Function to execute the generated SQL query using Sequelize Models
const executeSQLQuery = async (query: string): Promise<any> => {
  try {
    let result;
    if (query.includes("LeadModels")) {
      result = await LeadModel.sequelize?.query(query, {
        type: QueryTypes.SELECT,
      });
    } else if (query.includes("ActivityModels")) {
      result = await ActivityModel.sequelize?.query(query, {
        type: QueryTypes.SELECT,
      });
    }

    return result;
  } catch (error) {
    console.error("SQL Execution Error:", error);
    return null;
  }
};
