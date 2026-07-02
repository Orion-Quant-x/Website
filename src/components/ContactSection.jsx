import React from 'react';

const ContactSection = () => {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-glow"></div>
      <div className="cta-inner">
        <h2 className="cta-title reveal">Enter the<br /><em>event horizon.</em></h2>
        <p className="cta-sub reveal reveal-delay-1">
          Accredited investors and family offices.<br />
          Minimum commitment ₹2.5M. Quarterly liquidity.
        </p>
        <div className="cta-actions reveal reveal-delay-2">
          <a href="mailto:contact@orionquantllp.com" className="btn-primary">Contact Us</a>
          <a href="#" className="btn-ghost">Request Deck</a>
        </div>
        <div className="cta-contact-detail reveal reveal-delay-3">
          <span className="cta-contact-label">Investor Relations</span>
          <a href="mailto:contact@orionquantllp.com" className="cta-contact-email">
            contact@orionquantllp.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
