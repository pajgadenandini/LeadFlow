import React from "react"

const Disclaimer: React.FC = () => {
    return (
        <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
                By Creating account and Logging in, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                </a>
            </p>
        </div>
    )
};

export default Disclaimer;