import React from 'react';

const CertificationChecklist = ({ cert, answers, onToggle }) => {
  return (
    <div className="space-y-4">
      {cert.questions.map((question, index) => {
        const isChecked = !!answers[`${cert.id}_${question.id}`];
        return (
          <div 
            key={question.id}
            onClick={() => onToggle(cert.id, question.id)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              isChecked 
                ? 'bg-cafe-vino-50/50 border-cafe-vino-200 shadow-sm' 
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
              isChecked ? 'bg-cafe-vino-600 shadow-lg shadow-cafe-vino-600/30' : 'bg-gray-100 border border-gray-200'
            }`}>
              {isChecked && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <span className={`text-sm font-bold ${isChecked ? 'text-cafe-vino-900' : 'text-gray-700'}`}>
                {index + 1}. {question.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CertificationChecklist;
