import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <a className="wordmark" href="#">
        FORM <i>&</i> FIELD<span>OBJECTS FOR EVERYDAY</span>
      </a>
      <span>© 2026 Form & Field. A little more considered.</span>
      <div>
        <span>English / USD</span>
        <span>
          Designed for everyday living <ArrowUpRight size={13} />
        </span>
      </div>
    </footer>
  );
}
