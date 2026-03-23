// Prefill form from CTA buttons
function prefillForm(interest, message) {
    setTimeout(function() {
        var interestEl = document.getElementById('interest');
        var messageEl = document.getElementById('message');
        if (interestEl) interestEl.value = interest;
        if (messageEl && !messageEl.value) messageEl.value = message;
        var nameEl = document.getElementById('name'); if (nameEl) nameEl.focus();
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (form.querySelector('input[name="website"]').value) return;

        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            interest: form.interest.value,
            referral: form.referral.options[form.referral.selectedIndex].text,
            message: form.message.value.trim(),
            timestamp: new Date().toISOString()
        };

        btn.disabled = true;
        btn.textContent = 'Sending...';
        status.classList.add('hidden');

        try {
            const ENDPOINT = form.dataset.endpoint;
            if (ENDPOINT) {
                await fetch(ENDPOINT, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(data)
                });
                // no-cors: can't read response, but if fetch didn't throw, it reached the server
            }

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
                status.classList.add('hidden');
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
