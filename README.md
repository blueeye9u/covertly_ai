# Covertly.ai Frontend

## Project Description

Covertly.ai Frontend is a Next.js application that integrates with the Covertly.ai backend to provide a seamless user experience for interacting with our AI-powered chatbot. The application supports various features, including user authentication, password management, email verification, social authentication, and more, while ensuring a user-friendly and secure environment.


## Project Structure
```
src
├── assets
│   ├── icons
│   │   ├── facebook.tsx
│   │   └── google.tsx
│   └── images.ts
├── components
│   ├── AutoResizeTextarea
│   │   └── index.tsx
│   ├── ChatBootLayout
│   │   └── index.tsx
│   ├── ChatHeader
│   │   └── index.tsx
│   ├── ChatSkelton
│   │   └── index.tsx
│   ├── ChatThreadActions
│   │   └── index.tsx
│   ├── ChatTimer
│   │   ├── index.tsx
│   │   └── timer.tsx
│   ├── PreferencesChart
│   │   └── index.tsx
│   ├── SelectChatVersion
│   │   └── index.tsx
│   ├── Sidebar
│   │   └── index.tsx
│   ├── auth
│   │   ├── forgotPassword
│   │   │   └── ForgotPasswordModule.tsx
│   │   ├── linkAccount
│   │   │   └── index.tsx
│   │   ├── login
│   │   │   ├── LoginModule.tsx
│   │   │   └── LoginPasswordModule.tsx
│   │   ├── otpVerification
│   │   │   └── index.tsx
│   │   ├── resetpassword
│   │   │   └── ResetPasswordModule.tsx
│   │   ├── signup
│   │   │   ├── SetupPassword.tsx
│   │   │   └── SignUpModule.tsx
│   │   └── verifyEmail
│   │       └── index.tsx
│   ├── chat
│   │   ├── chatBox
│   │   │   ├── components
│   │   │   │   ├── answer.tsx
│   │   │   │   └── question.tsx
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── chatThread
│   │   └── index.tsx
│   ├── config
│   │   ├── MetaTags.tsx
│   │   └── site.js
│   ├── data
│   │   ├── RoutesArray.ts
│   │   └── colors.ts
│   ├── global
│   │   ├── ShimmerImage
│   │   │   └── ShimmerImage.tsx
│   │   ├── authLayout
│   │   │   └── index.tsx
│   │   ├── basicmodal
│   │   │   └── BasicModal.tsx
│   │   ├── button
│   │   │   └── Button.tsx
│   │   ├── container
│   │   │   └── Container.tsx
│   │   ├── footer
│   │   │   └── Footer.tsx
│   │   ├── forms
│   │   │   ├── CreatableSelectComponent.tsx
│   │   │   ├── DatePickerComponent.tsx
│   │   │   ├── FormCheck.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Label.tsx
│   │   │   ├── MultiSelectComponent.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── SwitchToggle.tsx
│   │   │   └── Textarea.tsx
│   │   ├── header
│   │   │   └── Header.tsx
│   │   ├── imageComponent
│   │   │   └── ImageComponent.tsx
│   │   ├── layout
│   │   │   └── index.tsx
│   │   ├── navbar
│   │   │   └── Navbar.tsx
│   │   ├── noDataFound
│   │   │   └── NoDataFound.tsx
│   │   ├── noResultFound
│   │   │   └── NoResultFound.tsx
│   │   ├── routes
│   │   │   └── index.tsx
│   │   ├── shimmers
│   │   │   ├── ImageShimmer.tsx
│   │   │   └── TableShimmer.tsx
│   │   ├── tabs
│   │   │   └── Tabs.tsx
│   │   ├── themeLoader
│   │   │   ├── InlineLoader.tsx
│   │   │   └── ThemeLoader.tsx
│   │   ├── tooltip
│   │   │   └── Tooltip.tsx
│   │   └── userDropdown
│   │       └── UserDropdown.tsx
│   ├── hoc
│   │   ├── withAuthentication.tsx
│   │   └── withoutAuthentication.tsx
│   ├── modals
│   │   ├── CreateAccountSuccessfully
│   │   │   └── index.tsx
│   │   ├── DeleteModal
│   │   │   └── index.tsx
│   │   ├── LogoutModal
│   │   │   └── index.tsx
│   │   ├── SubscriptionModal
│   │   │   └── index.tsx
│   │   ├── accountVerified
│   │   │   └── index.tsx
│   │   ├── emailSend
│   │   │   └── index.tsx
│   │   ├── login
│   │   │   └── Login.tsx
│   │   ├── otpVerified
│   │   │   └── index.tsx
│   │   ├── signup
│   │   │   └── SignUp.tsx
│   │   └── updatepassword
│   │       └── UpdatePassword.tsx
│   ├── routes
│   │   └── routes.tsx
│   └── socialAuth
│       └── index.tsx
│   └── subscriptions
│       └── index.tsx
├── constants
│   ├── routes.ts
│   └── subscription-data.ts
├── context
│   ├── conversation.context.tsx
│   └── navigationHistoryContext.tsx
├── enums
│   ├── gpt-models.enum.ts
│   ├── providers.enum.ts
│   ├── routes.enum.ts
│   ├── steps.enum.ts
│   ├── subscription.enum.ts
│   └── trial-limit.enum.ts
├── hooks
│   ├── useDebouncedClick.tsx
│   ├── useFetchChats.ts
│   ├── useLoggedInStatus.ts
│   ├── useLoggedInUser.tsx
│   ├── useNavigationHistory.tsx
│   ├── useRedirectAuthenticatedUser.ts
│   ├── useRedirectUnAuthenticatedUser.ts
│   ├── useSocialAuthLogin.tsx
│   └── useSubscriptionPackage.tsx
├── interfaces
│   ├── Button.ts
│   ├── Container.ts
│   ├── chat-message.ts
│   ├── package.interface.ts
│   ├── response.ts
│   ├── send-message.ts
│   ├── token.ts
│   └── user.ts
├── modules
│   ├── ElementsModule
│   │   └── ElementsModule.tsx
│   ├── HomeModule
│   │   └── Page
│   │       └── HomeModule.tsx
│   ├── PreferencesModule
│   │   └── index.tsx
│   └── SettingsModule
│       ├── components
│       │   ├── PasswordSettings.tsx
│       │   ├── ProfileSettings.tsx
│       │   └── SettingsTabs.tsx
│       └── index.tsx
├── pages
│   ├── api
│   │   └── hello.ts
│   ├── login
│   │   ├── google.tsx
│   │   ├── index.tsx
│   │   └── password.tsx
│   ├── signup
│   │   ├── index.tsx
│   │   ├── password.tsx
│   │   └── setup-password.tsx
│   ├── chat
│   │   └── index.tsx
│   ├── account
│   │   ├── verification
│   │   │   └── index.tsx
│   │   └── email
│   │       └── index.tsx
│   ├── subscription
│   │   └── index.tsx
│   ├── verify-email
│   │   └── index.tsx
│   └── settings
│       └── index.tsx
├── providers
│   ├── gpt.provider.ts
│   └── user.provider.ts
├── services
│   ├── auth
│   │   ├── auth.service.ts
│   │   ├── forgotPassword.service.ts
│   │   ├── linkAccount.service.ts
│   │   ├── login.service.ts
│   │   ├── otpVerification.service.ts
│   │   ├── resetPassword.service.ts
│   │   ├── signup.service.ts
│   │   └── verifyEmail.service.ts
│   ├── chat.service.ts
│   ├── notification.service.ts
│   ├── profile.service.ts
│   ├── subscription.service.ts
│   ├── user.service.ts
│   └── websocket.service.ts
├── store
│   ├── auth.store.ts
│   ├── chat.store.ts
│   ├── notification.store.ts
│   ├── profile.store.ts
│   ├── subscription.store.ts
│   └── user.store.ts
├── styles
│   ├── global.scss
│   └── variables.scss
├── utils
│   ├── date.utils.ts
│   ├── gpt.utils.ts
│   ├── string.utils.ts
│   └── token.utils.ts
└── validations
    ├── auth.validation.ts
    ├── chat.validation.ts
    ├── profile.validation.ts
    ├── subscription.validation.ts
    └── user.validation.ts
```
## Features

- **User Authentication**: Register, login, and manage user sessions using JWT.
- **Password Management**: Allow users to reset and update their passwords securely.
- **Email Verification**: Verify user emails using OTP for enhanced security.
- **Social Authentication with Google**: Authenticate users using their Google accounts.
- **Link-Account Feature with OTP**: Enable users to link multiple accounts with OTP verification.
- **Send Email via HTML Jinja Template**: Send formatted emails using HTML templates rendered with Jinja2.
- **User Update Profile**: Allow users to update their profile information.
- **User Update Password**: Provide functionality for users to update their passwords.
- **Get Authenticated User via User Decorator**: Retrieve authenticated user details using a custom decorator.
- **Anonymity**: Engage in conversations without revealing your identity. Your privacy is our top priority.
- **AI-powered Conversations**: Enjoy engaging and insightful conversations powered by GPT 2.5 and GPT 4o.
- **Diverse Topics**: Discuss a wide range of subjects, from casual chat to seeking advice or exploring new ideas.
- **User-Friendly Interface**: Simple and intuitive interface designed for a seamless chatting experience.
- **Real-Time Interaction**: Instant responses from our AI chatbot for a dynamic and interactive conversation.
- **Secure Environment**: Robust security measures to ensure your conversations remain private and secure.

## Installation

To get started with the Covertly.ai Frontend, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.
   ```bash
   git clone https://github.com/your-repository/covertly-ai-frontend
   cd covertly-ai-frontend
   yarn
   yarn dev
   ```
## Technologies Used
   The frontend application is built using the following technologies:

- **Next.js**: A React framework for building server-side rendered (SSR) and static web applications.
- **TypeScript**: A statically typed superset of JavaScript for safer and more robust code.
- **Yarn**: A package manager for managing project dependencies.
These technologies were chosen for their efficiency, scalability, and developer-friendly features, allowing the frontend to provide a smooth and responsive user experience.

## System Overview
The Covertly.ai Frontend connects with the Covertly.ai backend to handle user authentication, password management, and chatbot interactions. It uses JWT for secure authentication, supports various social login options, and ensures that user interactions with the AI are private and secure.

## Usage

To start using Covertly.ai, follow these steps:

1. **Access the Chat Interface**: Open the Covertly.ai application or visit the web interface where the chatbot is hosted.

2. **Start a Conversation**: Begin interacting with the chatbot by typing your message in the chat input field.

3. **Explore Topics**: Feel free to discuss a wide range of topics. Whether you're interested in casual conversation, seeking advice, or exploring new ideas, the AI is here to assist.

4. **Maintain Anonymity**: You can chat freely without revealing your personal information. The system is designed to protect your identity and maintain privacy.

5. **Receive Real-Time Responses**: Enjoy immediate responses from the chatbot, making your interaction smooth and engaging.

6. **End Session**: Simply close the chat window or navigate away from the chat interface to end your session. Your conversation history will not be saved, ensuring complete privacy.

