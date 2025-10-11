export const AnonymityFaqData = [
    {
        id: "1",
        isOpen: false,
        question: "How does Covertly ensure my anonymity?",
        answer: "At Covertly, privacy is our top priority. We use end-to-end encryption, zero data tracking, and secure authentication methods to ensure that no information is stored or linked to your activity. Whether you log in with a secret key or an external provider, your identity remains protected at all times."
    },
    {
        id: "2",
        isOpen: false,
        question: "What is a Secret Key Login and how does it work?",
        answer: "At Covertly, privacy is our top priority. We use end-to-end encryption, zero data tracking, and secure authentication methods to ensure that no information is stored or linked to your activity. Whether you log in with a secret key or an external provider, your identity remains protected at all times."
    },
    {
        id: "3",
        isOpen: false,
        question: "What happens if I use Microsoft, Google, Apple, or Facebook to log in?",
        answer: <div>
            <p className="mb-4">Even when using Microsoft, Google, Apple, or Facebook, Covertly blocks all unnecessary data. We only accept your email address, which is then:</p>
                <ul className="mb-4 list-disc">
                    <li className="list-disc ml-6">Mapped to a 12-digit anonymous code</li>
                    <li className="list-disc ml-6">Linked only to your Token balance (not your real identity)</li>
                    <li className="list-disc ml-6">Never stored with any personal data. This ensures that even when using third-party logins, your anonymity remains intact.</li>
                </ul>
                Your secret key is your only access method, so be sure to store it securely, as we cannot recover lost keys.
        </div>
    },
    {
        id: "4",
        isOpen: false,
        question:"Does Covertly store or track my conversations?",
        answer:"No. Covertly does not store, track, or log any conversations. All messages are end-to-end encrypted, meaning even we cannot see what you send or receive. Once your session ends, your data is permanently erased."
    },
    {
        id: "5",
        isOpen: false,
        question: "Can I delete my account or reset my identity?",
        answer:"Yes! If you use a Secret Key Login, simply generate a new key to start fresh—your old key becomes inaccessible. If you use an external login, you can request a full account wipe, permanently removing any stored mappings to your 12-digit code."
    },
]