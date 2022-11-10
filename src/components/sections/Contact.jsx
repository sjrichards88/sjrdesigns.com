import { Component } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

let recaptchaInstance;

class Contact extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      email: '',
      message: '',
      googleVerified: false,
      g_recaptcha_response: false,
      nameError: false,
      emailError: false,
      messageError: false,
      googleVerifiedError: false,
      nameActive: false,
      emailActive: false,
      messageActive: false,
      formSuccess: false,
      formError: false
    }
    
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onGoogleVerify = this.onGoogleVerify.bind(this)
  }

  handleInputFocus(e) {
    const name = e.target.name
    const event = e.type
    const value = event === 'blur' ? false : true
    this.setState({
      [`${name}Active`]: value
    })
  }

  handleInput(e) {
    const name = e.target.name
    const value = e.target.value
    let error = false
    
    if (value.trim() === '') {
      error = true
    }
    
    this.setState({
      [name]: value,
      [`${name}Error`]: error
    })
  }

  encode(data) {
    return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
  }

  handleSubmit(e) {
    e.preventDefault()
    let errorState = []
    const { name, email, message, googleVerified, g_recaptcha_response } = this.state
    
    if (name.trim() === '') {
      errorState.nameError = true
    }
    
    if (email.trim() === '') {
      errorState.emailError = true
    }
    
    if (message.trim() === '') {
      errorState.messageError = true
    }
    
    if (googleVerified === false || g_recaptcha_response == false) {
      errorState.googleVerifiedError = true
    }
    
    if (Object.keys(errorState).length !== 0 && errorState.constructor !== Object) {
      this.setState(errorState)
      return
    }
    
    const postData = this.encode({
      "form-name": "contact",
      "name": name,
      "email": email,
      "message": message,
      "g-recaptcha-response": g_recaptcha_response
    })
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: postData
    })
    .then(() => {
      this.setState({
        name: '',
        email: '',
        message: '',
        formSuccess: true,
        googleVerified: false,
        g_recaptcha_response: false
      })
      this.recap.reset()
    })
    .catch(error => {
      this.setState({
        formError: true
      })
    })
  }


  onGoogleVerify(res) {
    if (res.length !== 0) {
      this.setState({
        googleVerified: true,
        googleVerifiedError: false,
        g_recaptcha_response: res
      })
    }
  }

  render() {

    const { 
      name,
      email,
      message,
      nameError,
      emailError,
      messageError,
      googleVerifiedError,
      nameActive,
      emailActive,
      messageActive,
      formSuccess
    } = this.state

    return(
      <section className="section contact" id="contact">
        <h2>Contact</h2>
        <div className="contact__wrap">
          <div className="contact__form">
            <form 
              name="contact" 
              method="POST" 
              className="form" 
              data-netlify="true" 
              data-netlify-recaptcha="true"
              netlify-honeypot="bot-field"
              onSubmit={this.handleSubmit}
            >
              <div className="hidden"> 
                <input name="bot-field" />
              </div>
              <div className="form__group form__group--50">
                <div className={`form__input-wrap ${nameActive === true ? 'active' : ''}`} id="name">
                  <input 
                    type="text" 
                    name="name"
                    value={name}
                    placeholder="Name" 
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputFocus}
                    onChange={this.handleInput} 
                  />
                </div>
                <div className={`form__errors ${nameError === true ? '' : 'hidden'}`}>
                  Name is required
                </div>
              </div>

              <div className="form__group form__group--50 form__group--50-right">
                <div className={`form__input-wrap ${emailActive === true ? 'active' : ''}`} id="email">
                  <input 
                    type="email" 
                    name="email"
                    value={email}
                    placeholder="Email"
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputFocus}
                    onChange={this.handleInput} 
                  />
                </div>
                <div className={`form__errors ${emailError === true ? '' : 'hidden'}`}>
                  Email is required
                </div>
              </div>

              <div className="form__group">
                <div className={`form__input-wrap ${messageActive === true ? 'active' : ''}`} id="message">
                  <textarea 
                    name="message"
                    value={message}
                    cols="30" 
                    rows="10" 
                    placeholder="Message" 
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputFocus}
                    onChange={this.handleInput} 
                  >
                  </textarea>
                </div>
                <div className={`form__errors ${messageError === true ? '' : 'hidden'}`}>
                  Message is required
                </div>
              </div>

              <div className="form__group">
                <ReCAPTCHA
                  ref={(r) => this.recap = r}
                  sitekey="6LdAMW8UAAAAANEbvi_hxSI83hgdz9ZCAajbS8t-"
                  onChange={this.onGoogleVerify}
                />
                <div className={`form__errors ${googleVerifiedError === true ? '' : 'hidden'}`}>
                  Recaptcha is required
                </div>
              </div>

              <div className="form__group">
                <button type="submit">Send</button>
              </div>

              {formSuccess && 
                <div className="form__success">
                  Thank you for your message, I will be in touch shortly.
                </div>
              }
            </form>
          </div>

          <div className="contact__info">
            <div className="contact__info-block">
              <h4>Get in Touch!</h4>
              <p>Interesting in working with me? Need a website? <br /> Don't hesitate to send me a message.</p>
            </div>

            <div className="contact__info-block">
              <i className="icon icon-envelope-o" aria-hidden="true"></i> sjrichards88@gmail.com
            </div>

            <div className="contact__info-block">
              <i className="icon icon-phone" aria-hidden="true"></i> 07850944628
            </div>

            <div className="contact__info-block">
              <i className="icon icon-linkedin-square" aria-hidden="true"></i> <a href="https://www.linkedin.com/in/simon-richards-33874699/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Contact