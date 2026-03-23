// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Honeypot check
        if (form.querySelector('input[name="website"]').value) return;

        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            interest: form.interest.value,
            referral: form.referral.value,
            message: form.message.value.trim(),
            timestamp: new Date().toISOString()
        };

        btn.disabled = true;
        btn.textContent = 'Sending...';
        status.classList.add('hidden');

        try {
            // TODO: Replace with Apps Script endpoint
            const ENDPOINT = form.dataset.endpoint;
            if (ENDPOINT) {
                const res = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error('Server error');
            }

            // Success state
            btn.textContent = 'Sent!';
            btn.classList.remove('bg-primary');
            btn.classList.add('bg-green-600');
            status.textContent = 'Thank you! We will be in touch within 24 hours.';
            status.classList.remove('hidden', 'text-red-400');
            status.classList.add('text-green-400');
            form.reset();

            setTimeout(function() {
                btn.textContent = 'Send Message';
                btn.disabled = false;
                btn.classList.remove('bg-green-600');
                btn.classList.add('bg-primary');
            }, 5000);

        } catch (err) {
            btn.textContent = 'Send Message';
            btn.disabled = false;
            status.textContent = 'Something went wrong. Please email us directly.';
            status.classList.remove('hidden', 'text-green-400');
            status.classList.add('text-red-400');
        }
    });
});
