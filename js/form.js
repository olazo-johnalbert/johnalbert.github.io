function sendMail() {
    (function() {
        emailjs.init('xNrhjndeD5LrnxU13');
    })();
    
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    emailjs.send('service_r6cb4ia', 'template_rzmh7sa', {
        name: name,
        email: email,
        subject: subject,
        message: message
    }).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
}
        