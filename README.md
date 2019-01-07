# vue-base

https://vue-base.herokuapp.com/

Vue base project with:
- [x] Heroku ready deploy
- [x] Running back-end server, API configuration (CRUD), Vuex,...
- [x] Account routine
    - [x] register
       - [x] form masks (using vue-the-mask)
       - [x] form validation (using veevalidate)
            - [x] custom messages
            - [x] cpf validation
            - [x] cep validation (consulting viacep)
       - [x] send email (using nodemailer)
            - [x] email structure (using mustache and hogan)
    - [x] activate account/confirm e-mail
        - [ ] 24h expiration for activation token
    - [x] login   
        - [x] prevent unverified account access
        - [ ] two factor authentication (access info + device info)
    - [x] forgot password
    - [x] reset password 
    - [x] resend email confirmation
- [ ] Image upload (using cloudinary as CDN)
- [ ] Persist user info
