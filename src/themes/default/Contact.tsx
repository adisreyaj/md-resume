import React from 'react';
import { Metadata } from '../../interfaces/resume-data.interface';

const Contact: React.FC<any> = ({ metadata }: { metadata: Metadata }) => {
  return (
    <section className="section contact">
      <h3 className="section__heading">Contact</h3>
      <div>
        <ul className="max-w-xs space-y-1 contact__list">
          <li>
            <a href="mailto:hi@adi.so">{metadata.email}</a>
          </li>
          <li>
            <a href="tel:0918088886884">{metadata.phone}</a>
          </li>
          <li>
            <a href={metadata.website}>
              {metadata.website.replace(/^https?\:\/\//i, '')}
            </a>
          </li>
          <li>
            <p>{metadata.address}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contact;
