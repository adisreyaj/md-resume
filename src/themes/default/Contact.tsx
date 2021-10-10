import React from 'react';
import { Metadata } from '../../interfaces/resume-data.interface';

const Contact: React.FC<{ metadata: Metadata }> = ({ metadata }) => {
  return (
    <section className="section contact">
      <h3 className="section__heading">Contact</h3>
      {metadata &&
        (() => {
          const { email, phone, address, website } = metadata;
          return (
            <div>
              <ul className="max-w-xs space-y-1 contact__list">
                <li>
                  <a href="mailto:hi@adi.so">{email ?? 'hi@adi.so'}</a>
                </li>

                <li>
                  <a href="tel:0918088886884">{phone ?? '987654321'}</a>
                </li>

                <li>
                  <a href={website}>{website?.replace(/(^\w+:|^)\/\//, '') ?? 'website'}</a>
                </li>

                <li>
                  <p>{address ?? 'Address'}</p>
                </li>
              </ul>
            </div>
          );
        })()}
    </section>
  );
};

export default Contact;
