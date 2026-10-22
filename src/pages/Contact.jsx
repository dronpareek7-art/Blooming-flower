import { useState } from "react";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import "../components/ComponentsCss/Contact.css";

const initialForm = {
  name: "",
  email: "",
  subject: "General Enquiry",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setStatus({
        type: "error",
        message: "Please complete all required fields.",
      });
      return;
    }

    // Frontend demo only: connect an API or email service to send messages.
    setStatus({
      type: "success",
      message:
        "Thank you for reaching out! Your form looks good. Connect a backend to deliver your message to the team.",
    });

    setForm(initialForm);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero__image">
          <img
            src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1600&q=85"
            alt="Beautiful fresh flowers"
          />
        </div>
        <div className="contact-hero__overlay" />

        <div className="contact-hero__content">
          <span className="contact-eyebrow">WE'RE HERE FOR YOU</span>
          <h1>
            Let's talk
            <br />
            <em>flowers.</em>
          </h1>
          <p>
            Have a question, need a little guidance, or planning
            something special? We'd love to hear from you.
          </p>
          <a href="#contact-form" className="contact-button">
            Send us a message <FiArrowRight />
          </a>
        </div>
      </section>

      <section className="contact-intro">
        <span className="contact-section-label">GET IN TOUCH</span>
        <h2>
          A little note can
          <br />
          <em>start something lovely.</em>
        </h2>
        <p>
          Whether you're choosing a bouquet or have a question about an
          order, we're here to help make things easier.
        </p>
      </section>

      <section className="contact-details">
        <article className="contact-detail-card">
          <span className="contact-detail-card__icon">
            <FiMail />
          </span>
          <h3>Email us</h3>
          <p>For questions and general enquiries.</p>
          <a href="mailto:hello@bloomingflower.example">
            hello@bloomingflower.example
          </a>
        </article>

        <article className="contact-detail-card">
          <span className="contact-detail-card__icon">
            <FiPhone />
          </span>
          <h3>Call us</h3>
          <p>Speak to our team about your enquiry.</p>
          <a href="tel:+910000000000">+91 00000 00000</a>
        </article>

        <article className="contact-detail-card">
          <span className="contact-detail-card__icon">
            <FiClock />
          </span>
          <h3>Our hours</h3>
          <p>Our typical support hours.</p>
          <span>Monday – Saturday</span>
          <span>10:00 AM – 6:00 PM</span>
        </article>
      </section>

      <section className="contact-main" id="contact-form">
        <div className="contact-main__aside">
          <span className="contact-section-label">DROP US A LINE</span>
          <h2>
            Tell us
            <br />
            <em>what's on your mind.</em>
          </h2>
          <p>
            Fill out the form and share a few details. We'd be happy to
            help with your questions, gifting ideas, or special requests.
          </p>

          <div className="contact-aside-note">
            <span className="contact-aside-note__icon">
              <FiMessageCircle />
            </span>
            <div>
              <strong>Every message matters.</strong>
              <p>
                We're all about making your flower-shopping experience
                thoughtful and welcoming.
              </p>
            </div>
          </div>

          <img
            className="contact-main__flower"
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85"
            alt="Soft pastel flower arrangement"
            loading="lazy"
          />
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__heading">
            <span className="contact-section-label">YOUR MESSAGE</span>
            <h3>How can we help?</h3>
            <p>Fields marked with * are required.</p>
          </div>

          <div className="contact-form__row">
            <label>
              Your name *
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email address *
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label>
            What is this about?
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
            >
              <option>General Enquiry</option>
              <option>Order Support</option>
              <option>Flower Recommendations</option>
              <option>Special Occasion</option>
              <option>Feedback</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Your message *
            <textarea
              name="message"
              rows={6}
              placeholder="Tell us a little about what you need..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          {status.message && (
            <div
              className={`contact-form__status is-${status.type}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </div>
          )}

          <button className="contact-button" type="submit">
            Send your message <FiSend />
          </button>

          <p className="contact-form__privacy">
            Your details should only be used to respond to your enquiry.
            Connect a secure backend before collecting real customer
            submissions.
          </p>
        </form>
      </section>

      <section className="contact-bottom">
        <span className="contact-section-label">A FINAL LITTLE THOUGHT</span>
        <h2>
          Life is better
          <br />
          <em>when it blooms.</em>
        </h2>
        <a href="/shop" className="contact-button">
          Explore our flowers <FiArrowRight />
        </a>
      </section>
    </main>
  );
}

export default Contact;