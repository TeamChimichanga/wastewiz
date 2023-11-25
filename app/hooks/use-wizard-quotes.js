const WIZARD_POZITIVE_QUOTES = [
  "Behold the magic of recycling, where the discarded finds new life!",
  "Witness the transformation as discarded remnants are reborn!",
  "In the alchemy of conservation, waste is but an ingredient for renewal!",
  "Behold the marvels of recycling where the old gives birth to the new!",
  "Through the wizardry of recycling, nature's balance is restored!",
  "See the echoes of our efforts as trash finds purpose anew!",
  "Recycling, the enchantment that grants eternity to the once-forgotten!",
  "As wizards of stewardship, we weave a tapestry of renewal from waste!",
  "In the recycling cauldron, refuse transforms into treasures!",
  "Witness the magic: where refuse becomes rejuvenation!",
  "Recycling: the arcane art that bestows vitality upon the discarded!",
];

const WIZARD_NEGATIVE_QUOTES = [
  "Alas, my spells falter; the discarded yet eludes my grasp!",
  "The wizard's art falters; the recycling magic remains elusive.",
  "Mistakes linger in the wizard's recycling craft; improvement beckons!",
  "The recycling incantation wavers; the refuse resists transformation.",
  "Recycling's mysteries confound the wizard; mastery requires persistence!",
  "The recycling scroll bears errors; the wizard's expertise yet incomplete.",
  "The enchantment of recycling evades; the wizard's skills require honing.",
  "Errors plague the wizard's recycling tome; wisdom seeks refinement.",
  "Amidst the wizard's efforts, recycling's essence eludes complete mastery.",
  "In the wizard's recycling quest, imperfections reveal the path to advancement.",
];

const useWizardQuotes = () => {
  const getTitle = (positive) =>
    positive ? "Magic wielded, greatness achieved!" : "Magic misfired, consequences acquired.";

  const getRandomQuote = (positive) => {
    const quotes = positive ? WIZARD_POZITIVE_QUOTES : WIZARD_NEGATIVE_QUOTES;
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  };

  return {
    getTitle,
    getQuote: getRandomQuote,
    getPositiveQuote: () => getRandomQuote(true),
    getNegativeQuote: () => getRandomQuote(false),
  };
};

export default useWizardQuotes;
