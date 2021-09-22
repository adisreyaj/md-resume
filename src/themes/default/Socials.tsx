import React from 'react';

const Socials: React.FC<{ socials: { name: string; link: string }[] }> = ({ socials }) => {
  return (
    <section className="section socials">
      <h3 className="section__heading">Socials</h3>
      <div>
        <ul className="space-y-1 socials__list">
          {socials?.length > 0 &&
            socials.map((social) => (
              <li>
                <a className="socials__link" href={social.link}>
                  {social.name}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Socials;
