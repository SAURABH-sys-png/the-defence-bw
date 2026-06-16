import React, { useState } from 'react';

const entriesDB = [
  // 10+2 Entries
  { name: 'NDA (Army Wing)', type: '10+2', minAge: 15.5, maxAge: 18.5, freq: 2, condition: (s) => s.age <= 18.5 },
  { name: 'NDA (Navy & Air Force)', type: '10+2', minAge: 15.5, maxAge: 19.5, freq: 2, condition: (s) => s.age <= 19.5 && s.stream === 'PCM' },
  { name: 'TES (Technical Entry Scheme - Army)', type: '10+2', minAge: 16.5, maxAge: 19.5, freq: 2, condition: (s) => s.age >= 16.5 && s.age <= 19.5 && s.stream === 'PCM' && s.hasJEE && s.gender === 'Male' },
  { name: '10+2 B.Tech Cadet Entry (Navy)', type: '10+2', minAge: 16.5, maxAge: 19.5, freq: 2, condition: (s) => s.age >= 16.5 && s.age <= 19.5 && s.stream === 'PCM' && s.hasJEE && s.gender === 'Male' },
  
  // Graduate Entries
  { name: 'CDS - IMA (Indian Military Academy)', type: 'Graduate', minAge: 19, maxAge: 24, freq: 2, condition: (s) => s.age >= 19 && s.age <= 24 && s.degreeStatus === 'Completed' && s.gender === 'Male' },
  { name: 'CDS - INA (Indian Naval Academy)', type: 'Graduate', minAge: 19, maxAge: 24, freq: 2, condition: (s) => s.age >= 19 && s.age <= 24 && s.degreeType === 'B.Tech/B.E.' && s.gender === 'Male' },
  { name: 'CDS - AFA (Air Force Academy)', type: 'Graduate', minAge: 20, maxAge: 24, freq: 2, condition: (s) => s.age >= 20 && s.age <= 24 && (s.degreeType === 'B.Tech/B.E.' || (s.degreeStatus === 'Completed' && s.stream === 'PCM')) && s.gender === 'Male' },
  { name: 'CDS - OTA (Officers Training Academy)', type: 'Graduate', minAge: 19, maxAge: 25, freq: 2, condition: (s) => s.age >= 19 && s.age <= 25 && s.degreeStatus === 'Completed' },
  { name: 'AFCAT - Flying Branch', type: 'Graduate', minAge: 20, maxAge: 24, freq: 2, condition: (s) => s.age >= 20 && s.age <= 24 && s.stream === 'PCM' && s.degreeStatus === 'Completed' },
  { name: 'AFCAT - Ground Duty (Technical)', type: 'Graduate', minAge: 20, maxAge: 26, freq: 2, condition: (s) => s.age >= 20 && s.age <= 26 && s.stream === 'PCM' && s.degreeType === 'B.Tech/B.E.' },
  { name: 'AFCAT - Ground Duty (Non-Technical)', type: 'Graduate', minAge: 20, maxAge: 26, freq: 2, condition: (s) => s.age >= 20 && s.age <= 26 && s.degreeStatus === 'Completed' },
  
  // Direct & Special Entries
  { name: 'TGC (Technical Graduate Course - Army)', type: 'Graduate', minAge: 20, maxAge: 27, freq: 2, condition: (s) => s.age >= 20 && s.age <= 27 && s.degreeType === 'B.Tech/B.E.' && s.gender === 'Male' },
  { name: 'SSC Tech (Army)', type: 'Graduate', minAge: 20, maxAge: 27, freq: 2, condition: (s) => s.age >= 20 && s.age <= 27 && s.degreeType === 'B.Tech/B.E.' },
  { name: 'NCC Special Entry', type: 'Graduate', minAge: 19, maxAge: 25, freq: 2, condition: (s) => s.age >= 19 && s.age <= 25 && s.degreeStatus === 'Completed' && s.hasNCC },
  { name: 'JAG (Judge Advocate General)', type: 'Graduate', minAge: 21, maxAge: 27, freq: 2, condition: (s) => s.age >= 21 && s.age <= 27 && s.degreeType === 'LLB' },
];

export default function DefenseCalculator() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    stream: 'Other',
    hasJEE: false,
    degreeStatus: 'None',
    degreeType: 'Other',
    hasNCC: false,
  });

  const [results, setResults] = useState({ eligible: [], ineligible: [] });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateAge = () => {
    const ageNum = parseFloat(formData.age);
    if (!ageNum || isNaN(ageNum)) {
      setError('Please enter a valid age.');
      return;
    }
    if (ageNum < 15.5 || ageNum > 32) {
      setError('Age must be between 15.5 and 32 years to be eligible for primary defense entries.');
      return;
    }
    setError('');
    setStep(2);
  };

  const calculateEligibility = () => {
    const ageNum = parseFloat(formData.age);
    const evalData = { ...formData, age: ageNum };

    const processed = entriesDB.map((entry) => {
      const isEligible = entry.condition(evalData);
      
      // Calculate remaining attempts based on upper age limit and entry frequency
      const yearsLeft = entry.maxAge - ageNum;
      let attempts = Math.ceil(yearsLeft * entry.freq);
      if (attempts < 0) attempts = 0;

      // Provide specific feedback for rejections
      let reason = '';
      if (!isEligible) {
        if (ageNum > entry.maxAge) reason = 'Age limit crossed.';
        else if (ageNum < entry.minAge) reason = 'Underage for this entry.';
        else if (entry.name.includes('Navy') || entry.name.includes('Air Force') || entry.name.includes('TES')) {
           if (evalData.stream !== 'PCM') reason = 'Requires Physics, Chemistry, and Math in 12th.';
           else if ((entry.name.includes('TES') || entry.name.includes('Navy 10+2')) && !evalData.hasJEE) reason = 'Requires JEE Mains appearance.';
        }
        else if (entry.type === 'Graduate' && evalData.degreeStatus !== 'Completed') reason = 'Requires a completed graduation degree.';
        else reason = 'Does not meet specific educational or gender criteria.';
      }

      return { ...entry, isEligible, attempts, reason };
    });

    setResults({
      eligible: processed.filter((r) => r.isEligible && r.attempts > 0),
      ineligible: processed.filter((r) => !r.isEligible || r.attempts <= 0),
    });
    setStep(3);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-50 min-h-screen font-sans">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Defense Entry Eligibility Calculator
        </h1>

        {/* STEP 1: AGE & GENDER */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Current Age (in years, e.g., 16.5)</label>
              <input
                type="number"
                name="age"
                step="0.1"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your exact age"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button
              onClick={validateAge}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              Continue to Qualifications
            </button>
          </div>
        )}

        {/* STEP 2: QUALIFICATIONS */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm mb-4">
              Age locked at <strong>{formData.age} years</strong>. Let's look at your educational background.
            </div>

            {/* 10+2 Details (Shown if age is relevant for 10+2 or Graduate entries requiring 12th info) */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">10+2 (Class 12) Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">12th Stream</label>
                  <select
                    name="stream"
                    value={formData.stream}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Other">Arts / Commerce / Biology</option>
                    <option value="PCM">Physics, Chemistry, Math (PCM)</option>
                  </select>
                </div>
                
                {formData.stream === 'PCM' && parseFloat(formData.age) <= 20 && (
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="hasJEE"
                      id="hasJEE"
                      checked={formData.hasJEE}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="hasJEE" className="text-sm font-medium text-slate-700">
                      I have appeared for JEE Mains (Required for TES & Navy Tech)
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Graduation Details (Shown if age >= 19) */}
            {parseFloat(formData.age) >= 19 && (
              <div className="pt-2">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Graduation Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Graduation Status</label>
                    <select
                      name="degreeStatus"
                      value={formData.degreeStatus}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="None">Not Started / In 1st/2nd Year</option>
                      <option value="Completed">Final Year / Completed</option>
                    </select>
                  </div>

                  {formData.degreeStatus === 'Completed' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Degree Type</label>
                        <select
                          name="degreeType"
                          value={formData.degreeType}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="Other">B.A. / B.Sc / B.Com / Other</option>
                          <option value="B.Tech/B.E.">B.Tech / B.E.</option>
                          <option value="LLB">LLB (Law)</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center space-x-3 mt-4">
                        <input
                          type="checkbox"
                          name="hasNCC"
                          id="hasNCC"
                          checked={formData.hasNCC}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="hasNCC" className="text-sm font-medium text-slate-700">
                          I hold an NCC 'C' Certificate (Minimum 'B' Grade)
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                Back
              </button>
              <button
                onClick={calculateEligibility}
                className="w-2/3 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                Calculate Results
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULTS */}
        {step === 3 && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Eligible Section */}
            <div>
              <h2 className="text-2xl font-bold text-green-700 border-b-2 border-green-200 pb-2 mb-4">
                You Are Eligible For ({results.eligible.length})
              </h2>
              {results.eligible.length === 0 ? (
                <p className="text-slate-600 italic">No eligible entries found based on current criteria.</p>
              ) : (
                <div className="grid gap-4">
                  {results.eligible.map((entry, idx) => (
                    <div key={idx} className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{entry.name}</h3>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{entry.type} Entry</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-green-600">{entry.attempts}</div>
                        <div className="text-xs text-slate-500 font-medium uppercase">Attempts Left</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ineligible Section */}
            <div>
              <h2 className="text-2xl font-bold text-red-700 border-b-2 border-red-200 pb-2 mb-4">
                Currently Ineligible ({results.ineligible.length})
              </h2>
              <div className="grid gap-3">
                {results.ineligible.map((entry, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded text-sm flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="font-semibold text-slate-700">{entry.name}</div>
                    <div className="text-red-500 italic mt-1 md:mt-0">{entry.reason}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setStep(1); setFormData({ ...formData, age: '' }); }}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-6"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}