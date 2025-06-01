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
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
            <span className="text-primary-400 text-sm font-medium">Get In Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Let's Build Something 
            <span className="bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent"> Amazing</span>
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:bg-white/10 transition-all duration-300"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message as string}</p>
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:bg-white/10 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message as string}</p>
                  )}
                </div>
              </div>
              
              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
                <textarea 
                  {...register("message", { required: "Message is required" })} 
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-primary-400 focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message as string}</p>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-primary-500/25"
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
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
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
                    className="text-primary-400 hover:text-primary-300 transition-colors duration-300"
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
                I'm currently accepting new clients for Q1 2024. Let's discuss your project timeline and requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}