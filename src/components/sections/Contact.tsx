import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaLinkedin, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleInputFocus = (e) => {
    const input = e.target;
    const inputWrap = input.parentElement;

    if (e.type === "focus") {
      inputWrap.classList.add("active");
    } else {
      if (input.value === "") {
        inputWrap.classList.remove("active");
      }
    }
  }

  const onSubmit = async (data) => {
    if (data.honeypot === "") {
      const result = await fetch("/api/email", {
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
    }
  }

  return(
    <section className="bg-darkNavy py-8 md:py-16 px-4 md:px-8" id="contact">
      <h2 className="text-white text-center pb-8">Contact</h2>

      <div className="container max-w-screen-2xl flex flex-wrap justify-center">
        <div className="basis-full md:basis-1/2 pr-4">
          <form 
            method="post" 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap -mx-4"
          >
            <input type="text" name="honeypot" className="hidden" value="" {...register("honeypot")} />

            <div className="basis-full flex flex-col md:mb-4 md:basis-1/2 px-4 pb-4"> 
              <div className="input-wrap"> 
                <input 
                  type="text" 
                  placeholder="Name"
                  {...register("name")} 
                  onFocus={handleInputFocus}
                  onBlur={handleInputFocus}
                  className="w-full bg-inputBg border-transparent p-2 text-white relative z-[1] border-0 focus:outline-0 md:p-4"
                />
              </div>
            </div>
            
            <div className="basis-full flex flex-col md:mb-4 md:basis-1/2 px-4 pb-4"> 
              <div className="input-wrap"> 
                <input 
                  type="email" 
                  placeholder="Email"
                  {...register("email", { required: true })} 
                  onFocus={handleInputFocus}
                  onBlur={handleInputFocus}
                  className="w-full bg-inputBg border-transparent p-2 text-white relative z-[1] border-0 focus:outline-0 md:p-4"
                />
              </div>
              {errors.email && (
                <p className="text-tertiary font-bold my-1 text-red">{errors.email.message ? `${errors.email.message}` : `A valid email address is required`}</p>
              )}
            </div>
            
            <div className="w-full flex flex-col md:mb-4 px-4 pb-4"> 
              <div className="input-wrap">
                <textarea 
                  {...register("message")} 
                  placeholder="Message"
                  cols={30}
                  rows={10}
                  onFocus={handleInputFocus}
                  onBlur={handleInputFocus}
                  className="w-full bg-inputBg border-transparent p-2 text-white relative z-[1] border-0 focus:outline-0 md:p-4"
                />
              </div>
            </div>
            <div className="px-4 pb-4 self-end">
              <button className="bg-primary py-3 px-8 font-bold font-heading uppercase text-darkNavy border-2 border-primary border-solid transition duration-300 hover:bg-transparent hover:text-white">
                Submit
              </button>
            </div>
            {success && (
              <div className="basis-full pt-8 text-primary font-bold p-4">
                Thank you for your message, I will be in touch shortly.
              </div>
            )}
          </form>
        </div>
        <div className="basis-full md:basis-1/2 md:pl-12 pt-12 md:pt-0">
          <div className="pb-4 text-grey">
            <h4>Get in Touch!</h4>
            <p>Interesting in working with me? Need a website? <br /> Don't hesitate to send me a message.</p>
          </div>

          <div className="pb-6 text-grey flex items-center">
            <FaEnvelope className="mr-4 text-2xl" />
            sjrichards88@gmail.com
          </div>

          <div className="pb-6 text-grey flex items-center">
            <FaPhoneAlt className="mr-4 text-2xl" />
            07850944628
          </div>

          <div className="pb-6 text-grey flex items-center">
            <FaLinkedin className="mr-4 text-2xl" />
            <a href="https://www.linkedin.com/in/simon-richards-33874699/" target="_blank" rel="noreferrer" className="text-grey">LinkedIn</a>
          </div>
        </div>

      </div>

    </section>
  )
}