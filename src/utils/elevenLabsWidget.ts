const findAndClickCallButton = (shadowRoot: ShadowRoot, attempt = 0, maxAttempts = 15): void => {
  if (attempt >= maxAttempts) {
    console.warn('Max attempts reached, call button not found');
    console.log('Available buttons in shadow DOM:', shadowRoot.querySelectorAll('button'));
    return;
  }

  console.log(`Attempt ${attempt + 1} to find call button...`);

  const allButtons = shadowRoot.querySelectorAll('button');
  console.log(`Found ${allButtons.length} buttons in shadow DOM`);

  let callButton: HTMLButtonElement | null = null;

  allButtons.forEach((button, index) => {
    const btnElement = button as HTMLButtonElement;
    const text = btnElement.textContent?.trim().toLowerCase() || '';
    const ariaLabel = btnElement.getAttribute('aria-label')?.toLowerCase() || '';
    const dataAttr = btnElement.getAttribute('data-testid')?.toLowerCase() || '';
    const role = btnElement.getAttribute('role')?.toLowerCase() || '';

    console.log(`Button ${index}:`, {
      text,
      ariaLabel,
      dataAttr,
      role,
      className: btnElement.className,
      visible: btnElement.offsetParent !== null,
      display: window.getComputedStyle(btnElement).display
    });

    if (callButton) return;

    const isCallButton =
      text.includes('call') ||
      text.includes('позвонить') ||
      text.includes('start') ||
      ariaLabel.includes('call') ||
      ariaLabel.includes('start') ||
      dataAttr.includes('call') ||
      dataAttr.includes('start');

    const isVisible = btnElement.offsetParent !== null &&
                     window.getComputedStyle(btnElement).display !== 'none';

    if (isCallButton && isVisible) {
      callButton = btnElement;
      console.log('Found matching call button:', btnElement);
    }
  });

  if (!callButton && allButtons.length > 1) {
    const visibleButtons = Array.from(allButtons).filter(btn =>
      (btn as HTMLButtonElement).offsetParent !== null &&
      window.getComputedStyle(btn as HTMLButtonElement).display !== 'none'
    );

    if (visibleButtons.length > 0) {
      callButton = visibleButtons[visibleButtons.length - 1] as HTMLButtonElement;
      console.log('Using last visible button as fallback:', callButton);
    }
  }

  if (callButton) {
    console.log('Clicking call button...', callButton);
    callButton.click();
    console.log('Call button clicked successfully!');
  } else {
    console.log(`Call button not found yet, retrying in 300ms...`);
    setTimeout(() => {
      findAndClickCallButton(shadowRoot, attempt + 1, maxAttempts);
    }, 300);
  }
};

export const openElevenLabsWidget = (): boolean => {
  try {
    console.log('=== Step 1: Opening ElevenLabs widget ===');
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

    console.log('Clicking widget open button...');
    button.click();
    console.log('Widget opened!');

    console.log('=== Step 2: Waiting 1 second before clicking call button ===');
    setTimeout(() => {
      console.log('Now searching for call button...');
      findAndClickCallButton(shadowRoot);
    }, 1000);

    return true;
  } catch (error) {
    console.error('Error opening ElevenLabs widget:', error);
    return false;
  }
};
