const findAndClickCallButton = (shadowRoot: ShadowRoot, attempt = 0, maxAttempts = 20): void => {
  if (attempt >= maxAttempts) {
    console.warn('Max attempts reached, call button not found');
    console.log('Available buttons in shadow DOM:', shadowRoot.querySelectorAll('button'));
    return;
  }

  console.log(`Attempt ${attempt + 1} to find call button...`);

  let callButton: HTMLButtonElement | null = null;

  const buttonSelectors = [
    'button[aria-label*="Позвонить"]',
    'button[aria-label*="позвонить"]',
    'div[data-shown="true"] button',
    'button[aria-label*="Call"]',
    'button[aria-label*="call"]'
  ];

  for (const selector of buttonSelectors) {
    const button = shadowRoot.querySelector(selector) as HTMLButtonElement;
    if (button) {
      const isVisible = button.offsetParent !== null;
      const computedStyle = window.getComputedStyle(button);
      const isDisplayed = computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';

      console.log(`Found button with selector "${selector}":`, {
        visible: isVisible,
        displayed: isDisplayed,
        ariaLabel: button.getAttribute('aria-label'),
        className: button.className
      });

      if (isVisible && isDisplayed) {
        callButton = button;
        console.log('✓ Found visible call button!');
        break;
      }
    }
  }

  if (!callButton) {
    const allButtons = shadowRoot.querySelectorAll('button');
    console.log(`Total buttons found: ${allButtons.length}`);

    for (let i = 0; i < allButtons.length; i++) {
      const btn = allButtons[i] as HTMLButtonElement;
      const ariaLabel = btn.getAttribute('aria-label') || '';
      const isVisible = btn.offsetParent !== null;

      console.log(`Button ${i}:`, {
        ariaLabel,
        visible: isVisible,
        hasPhoneIcon: btn.querySelector('svg') !== null
      });

      if (ariaLabel.includes('Позвонить') || ariaLabel.includes('позвонить') || ariaLabel.includes('Call') || ariaLabel.includes('call')) {
        if (isVisible) {
          callButton = btn;
          console.log(`✓ Found call button at index ${i}!`);
          break;
        }
      }
    }
  }

  if (callButton) {
    console.log('🎯 Clicking call button now...', callButton);
    callButton.click();
    console.log('✅ Call button clicked successfully!');
  } else {
    console.log(`⏳ Call button not found yet, retrying in 250ms...`);
    setTimeout(() => {
      findAndClickCallButton(shadowRoot, attempt + 1, maxAttempts);
    }, 250);
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
