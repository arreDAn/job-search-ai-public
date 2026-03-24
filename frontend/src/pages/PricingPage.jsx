import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for exploring and light usage',
      features: [
        '3 Resume Optimizations / day',
        '2 Interview Sessions / day',
        '10 Answer Evaluations / day',
        'Unlimited job search',
        'Unlimited skill matching',
        'Unlimited application tracking',
        'Community support',
      ],
      cta: 'Get Started',
      ctaVariant: 'secondary',
      popular: false,
    },
    {
      name: 'Pro',
      price: 9.99,
      description: 'Great for serious job hunters',
      features: [
        '25 Resume Optimizations / day',
        '15 Interview Sessions / day',
        '100 Answer Evaluations / day',
        'Unlimited job search',
        'Unlimited skill matching',
        'Unlimited application tracking',
        'Priority support (coming soon)',
      ],
      cta: 'Upgrade to Pro',
      ctaVariant: 'primary',
      popular: true,
    },
    {
      name: 'Premium',
      price: 19.99,
      description: 'For power users and professionals',
      features: [
        'Unlimited Resume Optimizations',
        'Unlimited Interview Sessions',
        'Unlimited Answer Evaluations',
        'Unlimited job search',
        'Unlimited skill matching',
        'Unlimited application tracking',
        'Priority support (coming soon)',
        'Early access to new features',
      ],
      cta: 'Upgrade to Premium',
      ctaVariant: 'primary',
      popular: false,
    },
  ];

  return (
    <div className="page">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Simple, Transparent Pricing</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Choose the plan that fits your job search needs. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Billing Toggle */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          background: 'var(--bg-input)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '0.35rem',
          gap: '0.25rem',
        }}>
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: 'var(--radius)',
              border: 'none',
              background: billingCycle === 'monthly' ? 'var(--primary)' : 'transparent',
              color: billingCycle === 'monthly' ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'all 0.15s',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: 'var(--radius)',
              border: 'none',
              background: billingCycle === 'annual' ? 'var(--primary)' : 'transparent',
              color: billingCycle === 'annual' ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'all 0.15s',
            }}
          >
            Annual <span style={{ color: 'var(--success)', marginLeft: '0.5rem' }}>Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
      }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              background: plan.popular ? 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(233,30,140,0.05))' : 'var(--bg-card)',
              border: plan.popular ? '2px solid var(--primary)' : '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(108,99,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--primary)',
                color: '#fff',
                padding: '0.3rem 0.8rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}>
                Most Popular
              </div>
            )}

            {/* Header */}
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {plan.name}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {plan.description}
              </p>
            </div>

            {/* Price */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem',
            }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                ${plan.price === 0 ? 'Free' : plan.price}
              </span>
              {plan.price > 0 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              )}
            </div>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
              {plan.features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span style={{ color: 'var(--success)', fontWeight: 700 }}>✓</span>
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className={`btn btn-block ${plan.ctaVariant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                marginTop: '1rem',
              }}
              onClick={() => {
                if (plan.name === 'Free') {
                  window.location.href = '/register';
                } else {
                  alert(`Upgrade to ${plan.name} - Coming soon! Payment integration in progress.`);
                }
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Frequently Asked Questions</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            {
              q: 'Can I switch plans anytime?',
              a: 'Yes! Upgrade or downgrade your plan anytime. Changes take effect immediately.',
            },
            {
              q: 'What happens when I hit my daily limit?',
              a: "You'll see a message in the app saying you've used your daily quota. Try again tomorrow, or upgrade for more.",
            },
            {
              q: 'Do unused quotas carry over?',
              a: 'No, quotas reset daily at midnight UTC. Plan ahead based on your actual usage.',
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes! The Free plan is always available with no credit card required. Start with Free and upgrade when you need more.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards via Stripe. More payment methods coming soon.',
            },
            {
              q: 'Can I get a refund?',
              a: 'Refund policy coming soon once paid plans launch. Contact support for special cases.',
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.25rem',
            }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {item.q}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{
        textAlign: 'center',
        marginTop: '4rem',
        padding: '2rem',
        background: 'var(--bg-input)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
      }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Have questions?</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Email us at support@example.com or check our documentation.
        </p>
        <a href="/about" className="btn btn-secondary">
          Learn More About Job Search AI
        </a>
      </div>
    </div>
  );
}
