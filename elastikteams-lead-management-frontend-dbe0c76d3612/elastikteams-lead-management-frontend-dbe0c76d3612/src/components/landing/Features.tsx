import {
  BotIcon,
  EyeIcon,
  ScanEyeIcon,
  SquareChartGanttIcon,
  UserCheck2Icon,
  Users2Icon,
} from "lucide-react";
import React from "react";
import { TbMessageChatbotFilled } from "react-icons/tb";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      icon: <UserCheck2Icon className="w-6 h-6 text-indigo-600" />,
      title: "Lead Capture",
      description:
        "Capture leads from multiple sources including website forms, social media, and email campaigns.",
    },
    {
      icon: <SquareChartGanttIcon className="w-6 h-6 text-indigo-600" />,
      title: "Lead Management",
      description: "Management all you leads in a user friendly dashboard.",
    },
    {
      icon: <EyeIcon className="w-6 h-6 text-indigo-600" />,
      title: "Tracking Leads",
      description:
        "Keep track of leads has never been easire. Keep your lead details up to date.",
    },
    {
      icon: <ScanEyeIcon className="w-6 h-6 text-indigo-600" />,
      title: "Easy of access",
      description:
        "Easy access to all leads and there details. Making updates has never been simpler.",
    },
    {
      icon: <Users2Icon className="w-6 h-6 text-indigo-600" />,
      title: "Team Collaboration",
      description:
        "Improve team coordination with shared details, updates, and activity logs for each lead.",
    },
    {
      icon: <BotIcon className="w-6 h-6 text-indigo-600" />,
      title: "AI Integration",
      description:
        "AI chatbot to help you get information with a single prompt.",
    },
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Powerful Features for Modern Sales Teams
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to capture, nurture, and convert leads into loyal
          customers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {features.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};
