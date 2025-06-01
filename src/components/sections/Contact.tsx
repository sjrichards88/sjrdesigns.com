import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    if (data.honeypot === "") {
      try {
        const result = await fetch("https://sjrdesigns.com/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        let json = await result.json();
    
        if (json.errors) {
          console.log(json.errors);
          throw new Error('Failed to fetch API');
        }

        if (json.data && !json.error) {
          setSuccess(true);
          reset()
        }
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  }

  return(
    <section id="contact" className="relative py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
      {/* Background Elements matching hero */}
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
      
      {/* Dynamic Animated Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/15 to-teal-900/20 animate-gradient-shift"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/10 via-transparent to-cyan-900/15 animate-gradient-shift-reverse"></div>
      
      {/* Cinematic Glow Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-500/15 to-cyan-500/10 rounded-full blur-3xl animate-mega-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/15 to-pink-500/10 rounded-full blur-3xl animate-mega-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-teal-500/12 to-emerald-500/8 rounded-full blur-3xl animate-mega-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">Get In Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Let's Build Something 
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"> Amazing</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your digital presence? Let's discuss your project and how I can help bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input type="text" name="honeypot" className="hidden" {...register("honeypot")} />

              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    {...register("name", { required: "Name is required" })} 
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-rose-300 text-sm mt-1">{errors.name.message as string}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email"
                      }
                    })} 
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-rose-300 text-sm mt-1">{errors.email.message as string}</p>
                  )}
                </div>
              </div>
              
              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
                <textarea 
                  {...register("message", { required: "Message is required" })} 
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-rose-300 text-sm mt-1">{errors.message.message as string}</p>
                )}
              </div>

              {/* Budget Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Project Budget</label>
                  <select 
                    {...register("budget", { required: "Please select a budget range" })} 
                    className="w-full px-4 py-3 pr-8 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                  >
                    <option value="" className="bg-neutral-800 text-neutral-300">Select your budget range</option>
                    <option value="Under £2,500" className="bg-neutral-800 text-white">Under £2,500</option>
                    <option value="£2,500 - £5,000" className="bg-neutral-800 text-white">£2,500 - £5,000</option>
                    <option value="£5,000 - £10,000" className="bg-neutral-800 text-white">£5,000 - £10,000</option>
                    <option value="£10,000 - £20,000" className="bg-neutral-800 text-white">£10,000 - £20,000</option>
                    <option value="£20,000+" className="bg-neutral-800 text-white">£20,000+</option>
                    <option value="Let's discuss" className="bg-neutral-800 text-white">Let's discuss</option>
                  </select>
                  {errors.budget && (
                    <p className="text-rose-300 text-sm mt-1">{errors.budget.message as string}</p>
                  )}
                </div>

                {/* Monthly Payment Option */}
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="monthlyPayments"
                    {...register("monthlyPayments")}
                    className="mt-1 w-4 h-4 bg-white/5 border border-white/20 rounded focus:outline-none focus:border-blue-400 accent-blue-500"
                  />
                  <label htmlFor="monthlyPayments" className="text-sm text-neutral-300 leading-relaxed">
                    I would prefer to pay on a monthly basis rather than a lump sum
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-700 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Send Message
              </button>

              {/* Success Message */}
              {success && (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                  <p className="text-emerald-400 font-medium">
                    Thank you for your message! I'll get back to you within 24 hours.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Get in Touch</h3>
              <p className="text-neutral-300 leading-relaxed mb-8">
                Prefer to reach out directly? I'm always happy to discuss new projects and opportunities. Let's connect!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-neutral-300">sjrichards88@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Phone</p>
                  <p className="text-neutral-300">07850944628</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19S5.19 5.95 5.19 6.88A1.69 1.69 0 0 0 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">LinkedIn</p>
                  <a 
                    href="https://www.linkedin.com/in/simon-richards-33874699/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    Connect with me
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-semibold">Available for New Projects</span>
              </div>
              <p className="text-neutral-300 text-sm">
                Let's discuss your project timeline and requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes gradient-shift-reverse {
          0%, 100% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 0% 50%;
          }
        }

        @keyframes mega-float {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1) rotate(0deg);
          }
          25% {
            transform: translateY(-60px) translateX(40px) scale(1.05) rotate(3deg);
          }
          50% {
            transform: translateY(-30px) translateX(-20px) scale(0.95) rotate(-2deg);
          }
          75% {
            transform: translateY(-45px) translateX(25px) scale(1.02) rotate(1deg);
          }
        }

        @keyframes mega-float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-70px) rotate(8deg) scale(1.1);
          }
          66% {
            transform: translateY(-35px) rotate(-5deg) scale(0.9);
          }
        }

        @keyframes mega-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.12;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15) rotate(120deg);
            opacity: 0.2;
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
          background-size: 400% 400%;
        }

        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 10s ease-in-out infinite;
          background-size: 400% 400%;
        }

        .animate-mega-float {
          animation: mega-float 15s ease-in-out infinite;
        }

        .animate-mega-float-delayed {
          animation: mega-float-delayed 18s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-mega-pulse {
          animation: mega-pulse 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}