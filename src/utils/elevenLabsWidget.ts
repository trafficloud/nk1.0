const findAndClickCallButton = (shadowRoot: ShadowRoot, attempt = 0, maxAttempts = 10): void => {
  if (attempt >= maxAttempts) {
    console.warn('Max attempts reached, call button not found');
    return;
  }

  const selectors = [
    'button[aria-label*="call"]',
    'button[aria-label*="Call"]',
    'button:has(svg)',
    'button[class*="call"]',
    'button[class*="Call"]',
    'button'
  ];

  let callButton: HTMLButtonElement | null = null;

  for (const selector of selectors) {
    const buttons = shadowRoot.querySelectorAll(selector);

    for (const button of buttons) {
      const btnElement = button as HTMLButtonElement;
      const text = btnElement.textContent?.toLowerCase() || '';
      const ariaLabel = btnElement.getAttribute('aria-label')?.toLowerCase() || '';
      const className = btnElement.className?.toLowerCase() || '';

      if (
        text.includes('call') ||
        text.includes('позвонить') ||
        ariaLabel.includes('call') ||
        className.includes('call') ||
        (btnElement.style.backgroundColor && btnElement.offsetParent !== null)
      ) {
        callButton = btnElement;
        break;
      }
    }

    if (callButton) break;
  }

  if (callButton) {
    console.log('Call button found, clicking...');
    callButton.click();
  } else {
    setTimeout(() => {
      findAndClickCallButton(shadowRoot, attempt + 1, maxAttempts);
    }, 200);
  }
};

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
      findAndClickCallButton(shadowRoot);
    }, 500);

    return true;
  } catch (error) {
    console.error('Error opening ElevenLabs widget:', error);
    return false;
  }
};
