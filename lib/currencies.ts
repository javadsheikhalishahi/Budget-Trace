export const Currencies = [
    {Value: "USD", Label: "$ DOLLAR", locale: "en-US"},
    {Value: "GBP", Label: "£ POUND", locale: "en-GB"},
    {Value: "EUR", Label: "€ EURO", locale: "de-DE"},
    {Value: "JPY", Label: "¥ YEN", locale: "ja-JP"},
];


export type Currency = (typeof Currencies)[0];