import { useState, useEffect } from 'react'

interface FormData {
  plan: string
  name: string
  email: string
  website: string
  hasWebsite: string
  goals: string[]
  timeline: string
  budget: string
  message: string
}

export default function GetStartedForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    plan: '',
    name: '',
    email: '',
    website: '',
    hasWebsite: '',
    goals: [],
    timeline: '',
    budget: '',
    message: ''
  })

  // Pre-populate plan from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const planParam = urlParams.get('plan')
    
    if (planParam) {
      const planMap: { [key: string]: string } = {
        'essentials': 'Essentials - £100/month',
        'professional': 'Professional - £200/month',
        'complete': 'Complete - £300/month',
        'custom': 'Custom Solution'
      }
      
      const planName = planMap[planParam.toLowerCase()]
      if (planName) {
        setFormData(prev => ({ ...prev, plan: planName }))
        // Auto-advance to step 2 if plan is pre-selected
        setStep(2)
      }
    }
  }, [])

  const totalSteps = 6

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.plan !== ''
      case 2: return formData.name !== '' && formData.email !== ''
      case 3: return formData.hasWebsite !== ''
      case 4: return formData.goals.length > 0
      case 5: return formData.timeline !== ''
      case 6: return true
      default: return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const result = await fetch('/api/get-started', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: formData.plan,
          name: formData.name,
          email: formData.email,
          website: formData.website,
          hasWebsite: formData.hasWebsite,
          goals: formData.goals,
          timeline: formData.timeline,
          budget: formData.budget,
          message: formData.message
        }),
      })

      const json = await result.json()

      if (json.data && !json.error) {
        setIsSuccess(true)
      } else {
        console.error('Failed to send:', json.error)
        alert('Failed to send request. Please try again or contact us directly.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send request. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Request Sent Successfully!</h2>
          <p className="text-xl text-neutral-300 mb-8">
            Thanks for your interest! I'll review your information and get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-cyan-500 transition-all duration-300"
            >
              Back to Home
            </a>
            <a
              href="/pricing"
              className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Get Started</h1>
          <p className="text-neutral-400">Tell us about your project in a few simple steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <div key={num} className="flex items-center" style={{ flex: index < 5 ? '1 1 0%' : '0 0 auto' }}>
                <button
                  onClick={() => {
                    // Only allow clicking on steps that have been visited or current step
                    if (num <= step || (num === 1 && formData.plan) || (num === 2 && formData.email)) {
                      setStep(num)
                    }
                  }}
                  disabled={num > step && !(num === 1 && formData.plan) && !(num === 2 && formData.email)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 flex-shrink-0 focus:outline-none ${
                    step >= num
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white scale-110 cursor-pointer hover:scale-125'
                      : 'bg-white/10 text-neutral-500 cursor-not-allowed'
                  } ${step === num ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-neutral-900' : ''}`}
                  title={`Step ${num}`}
                >
                  {num}
                </button>
                {num < 6 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                      step > num ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-neutral-400">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 min-h-[400px] flex flex-col">
          {/* Step 1: Plan Selection */}
          {step === 1 && (
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Which plan interests you?</h2>
              <p className="text-neutral-400 mb-6">Choose the care plan that best fits your needs</p>
              <div className="space-y-4">
                {['Essentials - £100/month', 'Professional - £200/month', 'Complete - £300/month', 'Custom Solution'].map((plan) => (
                  <button
                    key={plan}
                    onClick={() => updateFormData('plan', plan)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 focus:outline-none border ${
                      formData.plan === plan
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/50 border-transparent'
                        : 'bg-white/5 text-white hover:bg-white/10 border-white/10'
                    }`}
                  >
                    <span className="font-semibold">{plan}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Let's get to know you</h2>
              <p className="text-neutral-400 mb-6">How should I contact you?</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Website Status */}
          {step === 3 && (
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Do you already have a website?</h2>
              <p className="text-neutral-400 mb-6">This helps me understand your needs better</p>
              <div className="space-y-4 mb-6">
                {['Yes, I have a website', 'No, I need a new website'].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateFormData('hasWebsite', option)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 focus:outline-none border ${
                      formData.hasWebsite === option
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/50 border-transparent'
                        : 'bg-white/5 text-white hover:bg-white/10 border-white/10'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {formData.hasWebsite === 'Yes, I have a website' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Website URL (optional)</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => updateFormData('website', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="https://www.yourwebsite.com"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Goals */}
          {step === 4 && (
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">What are your main goals?</h2>
              <p className="text-neutral-400 mb-6">Select all that apply</p>
              <div className="space-y-3">
                {[
                  'Keep website secure & updated',
                  'Improve website performance',
                  'Add new features',
                  'Regular content updates',
                  'SEO optimization',
                  'Technical support',
                  'Complete redesign'
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 focus:outline-none border ${
                      formData.goals.includes(goal)
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-transparent'
                        : 'bg-white/5 text-white hover:bg-white/10 border-white/10'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        formData.goals.includes(goal) ? 'border-white bg-white' : 'border-white/30'
                      }`}
                    >
                      {formData.goals.includes(goal) && (
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Timeline */}
          {step === 5 && (
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">When would you like to start?</h2>
              <p className="text-neutral-400 mb-6">Choose your preferred timeline</p>
              <div className="space-y-4">
                {['As soon as possible', 'Within 1 month', '1-3 months', 'Just exploring options'].map((time) => (
                  <button
                    key={time}
                    onClick={() => updateFormData('timeline', time)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 focus:outline-none border ${
                      formData.timeline === time
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/50 border-transparent'
                        : 'bg-white/5 text-white hover:bg-white/10 border-white/10'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Additional Info */}
          {step === 6 && (
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Anything else I should know?</h2>
              <p className="text-neutral-400 mb-6">Optional - share any additional details about your project</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Budget Range (optional)</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => updateFormData('budget', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="£100-200/month">£100-200/month</option>
                    <option value="£200-300/month">£200-300/month</option>
                    <option value="£300+/month">£300+/month</option>
                    <option value="One-time project">One-time project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Additional Information (optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell me more about your project..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                Back
              </button>
            )}
            {step < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-400 hover:to-cyan-500'
                    : 'bg-white/10 text-neutral-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Submit Request'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-center text-sm text-neutral-500 mt-6">
          Have questions? <a href="/#contact" className="text-blue-400 hover:text-blue-300 transition-colors">Contact me directly</a>
        </p>
      </div>
    </div>
  )
}

