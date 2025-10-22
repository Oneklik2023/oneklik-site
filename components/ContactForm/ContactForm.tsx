'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const ContactForm = () => {
  const [form, setForm] = useState<FormData>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token: captchaToken }),
      });

      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='md:p-10 p-5 bg-[#0F224C] rounded-lg'>
      <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-4 text-white'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={form.name}
            onChange={handleChange}
            required
            className='bg-[#6A7282] p-2 rounded-md'
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
            required
            className='bg-[#6A7282] p-2 rounded-md'
          />
          <input
            type='tel'
            name='phone'
            placeholder='Phone'
            value={form.phone}
            onChange={handleChange}
            className='bg-[#6A7282] p-2 rounded-md'
          />
        </div>
        <textarea
          name='message'
          placeholder='Message'
          value={form.message}
          onChange={handleChange}
          required
          className='bg-[#6A7282] p-2 rounded-md mt-4 w-full'
          rows={4}
        />

        {/*<ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          onChange={(token) => setCaptchaToken(token || '')}
        />*/}

        <button
          type='submit'
          disabled={loading || !captchaToken}
          className='bg-[#FC9700] text-white py-2 px-4 rounded-md mt-4 hover:bg-[#e68a00] cursor-pointer transition-all duration-300 ease-in-out'
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className='text-green-400 mt-2'>Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className='text-red-400 mt-2'>Failed to send. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
