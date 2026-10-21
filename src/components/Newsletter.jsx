import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  return (
    <section className="newsletter">
      <div>
        <div className="eyebrow">LET'S STAY IN TOUCH</div>
        <h2>A little good in your inbox.</h2>
        <p>New discoveries, thoughtful stories, and the occasional treat.</p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubscribed(true);
        }}
      >
        {subscribed ? (
          <div className="subscribe-success">
            <Check size={20} /> You’re on the list. Thanks for stopping by!
            <small>Demo signup — no email has been sent.</small>
          </div>
        ) : (
          <>
            <div className="email-field">
              <input
                type="email"
                required
                aria-label="Your email address"
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button aria-label="Subscribe to newsletter">
                <ArrowRight size={22} />
              </button>
            </div>
            <span>Only good things. Unsubscribe anytime.</span>
          </>
        )}
      </form>
    </section>
  );
}
