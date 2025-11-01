export const openElevenLabsWidget = (): boolean => {
  try {
    const elevenLabsWidget = document.querySelector('elevenlabs-convai') as any;

    if (!elevenLabsWidget) {
      console.warn('ElevenLabs widget not found');
      return false;
    }

    const shadowRoot = elevenLabsWidget.shadowRoot;

    if (!shadowRoot) {
      console.warn('ElevenLabs widget shadow root not found');
      return false;
    }

    const button = shadowRoot.querySelector('button');

    if (!button) {
      console.warn('ElevenLabs widget button not found');
      return false;
    }

    button.click();

    setTimeout(() => {
      const allButtons = shadowRoot.querySelectorAll('button');
      if (allButtons.length > 1) {
        allButtons[1].click();
      } else if (allButtons.length === 1) {
        allButtons[0].click();
      }
    }, 100);

    return true;
  } catch (error) {
    console.error('Error opening ElevenLabs widget:', error);
    return false;
  }
};
