import React from 'react';

const team = [
  {
    initials: 'RK',
    name: 'Raj Karan Sharma',
    role: 'Chief Investment Officer',
    email: 'raj@orionquantllp.com',
    linkedin: 'https://www.linkedin.com/in/rajkaransharma/',
    bio: 'A systematic investment leader leveraging deep expertise to pioneer market-neutral derivatives strategies and institutional-grade quantitative infrastructure. Seamlessly integrates advanced AI architectures with rigorous risk management to deliver consistent performance.',
    position: 'left',
  },
  {
    initials: 'SJ',
    name: 'Sarthak Jamwal',
    role: 'CEO & Designated Partner',
    email: 'sarthak@orionquantllp.com',
    linkedin: 'https://www.linkedin.com/in/sarthakjamwal/',
    bio: 'Navigating the unseen frequencies and structural mechanics that govern market microstructure and temporal risk. A quantitative trader treating market data as dynamic wave systems — building high-performance algorithmic engines to capture structural alpha before it dissipates into noise.',
    position: 'center',
  },
  {
    initials: 'YG',
    name: 'Yashvardhan Goel',
    role: 'Chief Technology Officer',
    email: 'yash@orionquantllp.com',
    linkedin: 'https://www.linkedin.com/in/yashvardhangoel02/',
    bio: 'Driving technological vision and engineering excellence with a core focus on advanced AI/ML integration. Proven in leveraging cross-disciplinary technical acumen to architect scalable infrastructure and deliver high-value, real-world solutions.',
    position: 'right',
  },
];

const TeamSection = () => {
  return (
    <section className="team-section" id="team">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <span
          className="section-tag reveal"
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '20px',
            display: 'block',
          }}
        >
          04 / The Team
        </span>
        <h2 className="section-title reveal reveal-delay-1">
          Architects<br />of alpha
        </h2>
      </div>

      <div className="team-grid">
        {team.map((member, i) => (
          <div key={member.initials} className={`team-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
            <div className="team-avatar">
              <div className="avatar-initials">{member.initials}</div>
              <div className="avatar-ring"></div>
            </div>
            <div className="team-name">{member.name}</div>
            <div className="team-role">{member.role}</div>
            <p className="team-bio">{member.bio}</p>
            <div className="team-links">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-link"
                aria-label={`${member.name} LinkedIn`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
              <a href={`mailto:${member.email}`} className="team-link" aria-label={`Email ${member.name}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                </svg>
                {member.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
