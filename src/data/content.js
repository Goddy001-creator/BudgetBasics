// BudgetBasics — pre-populated content (no backend, JSON-style data module)

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'basics', label: 'Budgeting Basics' },
  { id: 'needs-wants', label: 'Needs vs Wants' },
  { id: 'rule', label: '50-30-20 Rule' },
  { id: 'savings', label: 'Savings Goals' },
  { id: 'planner', label: 'Expense Planner' },
  { id: 'mistakes', label: 'Money Mistakes' },
  { id: 'infographics', label: 'Infographics' },
  { id: 'chatbot', label: 'AI Chatbot' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'contact', label: 'Contact Us' },
];

export const navGroups = [
  {
    id: 'learn',
    label: 'Learn',
    items: [
      { id: 'basics', label: 'Budgeting Basics' },
      { id: 'needs-wants', label: 'Needs vs Wants' },
      { id: 'rule', label: '50-30-20 Rule' },
      { id: 'mistakes', label: 'Money Mistakes' },
    ],
  },
  {
    id: 'plan',
    label: 'Plan & Track',
    items: [
      { id: 'savings', label: 'Savings Goals' },
      { id: 'planner', label: 'Expense Planner' },
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    items: [
      { id: 'infographics', label: 'Infographics' },
      { id: 'chatbot', label: 'AI Chatbot' },
    ],
  },
  {
    id: 'connect',
    label: 'Connect',
    items: [
      { id: 'feedback', label: 'Feedback' },
      { id: 'contact', label: 'Contact Us' },
      { id: 'about', label: 'About Us' },
    ],
  },
];

export const quickTips = [
  "Track every expense for a week — small leaks sink big budgets.",
  "Pay yourself first: move savings out before you can spend it.",
  "A want that waits 48 hours is easier to skip.",
  "Unused subscriptions are silent budget killers — audit monthly.",
  "Round up your savings — spare change adds up fast.",
  "Budgeting isn't about restriction, it's about choice.",
];

export const budgetingConcepts = [
  {
    id: 'income',
    title: 'Income',
    desc: 'Money coming in — allowance, scholarship stipends, part-time wages, or gifts. This is your starting point for any budget.',
  },
  {
    id: 'fixed',
    title: 'Fixed Expenses',
    desc: 'Costs that stay roughly the same each month — rent, transport pass, data subscription, tuition instalments.',
  },
  {
    id: 'variable',
    title: 'Variable Expenses',
    desc: 'Costs that change month to month — food, entertainment, shopping, outings.',
  },
  {
    id: 'requirements',
    title: 'Requirements (Needs)',
    desc: 'Essentials you cannot skip — food, housing, transport to school, learning materials.',
  },
  {
    id: 'wants',
    title: 'Wants',
    desc: 'Non-essential extras that improve comfort or enjoyment — streaming, eating out, new gadgets.',
  },
  {
    id: 'savings',
    title: 'Savings',
    desc: 'Money set aside for future goals or emergencies, ideally before spending on wants.',
  },
];

export const sampleMonthlyBudget = [
  { category: 'Income (allowance + part-time)', amount: 150000, type: 'income' },
  { category: 'Rent / Hostel contribution', amount: 45000, type: 'need' },
  { category: 'Feeding', amount: 35000, type: 'need' },
  { category: 'Transport', amount: 15000, type: 'need' },
  { category: 'Learning materials', amount: 10000, type: 'need' },
  { category: 'Entertainment & outings', amount: 15000, type: 'want' },
  { category: 'Shopping', amount: 10000, type: 'want' },
  { category: 'Savings', amount: 20000, type: 'savings' },
];

export const knowledgeCheck = {
  question: 'Which of these is a fixed expense for most students?',
  options: ['Monthly hostel rent', 'Weekend outings', 'Impulse snack purchases'],
  answer: 0,
  feedback: 'Correct — rent stays roughly the same every month, unlike outings or impulse buys, which vary.',
};

export const needsWantsItems = [
  { item: 'Textbooks for this semester', type: 'need' },
  { item: 'Latest smartphone upgrade', type: 'want' },
  { item: 'Bus fare to class', type: 'need' },
  { item: 'Weekend restaurant outing', type: 'want' },
  { item: 'Data bundle for coursework', type: 'need' },
  { item: 'New sneakers (3rd pair this month)', type: 'want' },
  { item: 'Rent payment', type: 'need' },
  { item: 'Streaming subscription', type: 'want' },
];

export const moneyMistakes = [
  {
    title: 'Impulse Buying',
    scenario: 'Ada sees a discounted jacket on Instagram and buys it instantly, before checking her budget.',
    fix: 'Wait 48 hours before any non-essential purchase over a set amount — the urge often fades.',
  },
  {
    title: 'Ignoring Small Expenses',
    scenario: 'Tunde spends ₦500 daily on snacks without tracking it — that\'s ₦15,000 a month unnoticed.',
    fix: 'Log every expense, even small ones, for at least two weeks to see the real pattern.',
  },
  {
    title: 'Late Payments',
    scenario: 'Chidi forgets a subscription renewal date and gets hit with a late fee.',
    fix: 'Set calendar reminders a few days before every recurring payment is due.',
  },
  {
    title: 'Unused Subscriptions',
    scenario: 'Fatima pays for three streaming services but only actively uses one.',
    fix: 'Review subscriptions monthly and cancel anything unused for 30+ days.',
  },
  {
    title: 'Spending Without a Plan',
    scenario: 'Emeka gets his allowance and spends freely the first week, then struggles for the rest of the month.',
    fix: 'Divide income into categories the day it arrives, before any spending happens.',
  },
];

export const infographics = [
  { id: 1, topic: 'needs-wants', title: 'Needs vs Wants at a Glance', caption: 'A simple visual split of essential vs optional spending categories.' },
  { id: 2, topic: 'rule', title: 'The 50-30-20 Split', caption: 'How to divide income into needs, wants, and savings.' },
  { id: 3, topic: 'cycle', title: 'The Monthly Budget Cycle', caption: 'Income in, categorize, track, review, adjust — repeat every month.' },
  { id: 4, topic: 'savings', title: '30-Day Saving Challenge', caption: 'A simple ramp-up challenge to build a saving habit.' },
];

export const expenseCategories = ['Food', 'Transport', 'Education', 'Entertainment', 'Shopping', 'Utilities', 'Miscellaneous'];

export const chatbotFAQ = [
  { keywords: ['need', 'needs'], answer: 'A need is something essential to daily life — food, housing, transport to school, and learning materials. Without it, day-to-day functioning becomes difficult.' },
  { keywords: ['want', 'wants'], answer: 'A want is something that adds comfort or enjoyment but isn\'t essential — things like streaming subscriptions, eating out, or the latest gadget.' },
  { keywords: ['save', 'saving', 'savings', 'how much should i save'], answer: 'A common educational guideline is the 50-30-20 rule: aim to save around 20% of your income each month, adjusting to fit your own situation.' },
  { keywords: ['overspend', 'overspending', 'avoid overspending'], answer: 'Track every expense, set a spending limit per category, wait before non-essential purchases, and review your budget weekly.' },
  { keywords: ['50-30-20', '50 30 20', 'rule'], answer: 'The 50-30-20 rule suggests spending 50% of income on needs, 30% on wants, and saving 20%. It\'s an educational guideline, not a fixed rule.' },
  { keywords: ['budget', 'budgeting'], answer: 'Budgeting means planning how you\'ll use your income across needs, wants, and savings before you spend it, so money is used intentionally.' },
  { keywords: ['goal', 'goals', 'savings goal'], answer: 'Set a target amount and a monthly contribution — the Savings Goals tool on this site can estimate how many months it will take.' },
  { keywords: ['mistake', 'mistakes'], answer: 'Common student money mistakes include impulse buying, ignoring small expenses, late payments, and unused subscriptions. See the Money Mistakes section for details.' },
];

export const suggestedPrompts = [
  'What is a need?',
  'How much should I save?',
  'How do I avoid overspending?',
];

export const chatbotFallback = "I can only help with basic budgeting topics right now — try asking about needs, wants, saving, or the 50-30-20 rule.";
export const chatbotDisclaimer = 'This chatbot provides basic educational information only, not professional financial advice.';

export const aboutText = {
  mission: 'BudgetBasics was built to make personal budgeting approachable for students, using simple guides, interactive tools, and visual examples instead of jargon.',
  creators: 'Designed and developed as an educational Web Innovation Unleashed project, focused entirely on client-side, privacy-respecting learning tools.',
};

export const contactInfo = {
  email: 'hello@budgetbasics.example',
  phone: '+234 800 000 0000',
  socials: [
    { label: 'Facebook', url: '#' },
    { label: 'LinkedIn', url: '#' },
  ],
};
