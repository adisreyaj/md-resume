import React from 'react';

const Languages: React.FC<{ languages: string[] }> = ({ languages }) => {
  return (
    <section className="section languages">
      <h3 className="section__heading">Languages</h3>
      <div>
        <ul className="languages__list">
          {languages?.length > 0 &&
            languages.map((item) => (
              <li key={item}>
                <p>{item}</p>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Languages;
