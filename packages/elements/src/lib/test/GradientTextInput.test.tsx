import GradientTextInput from '../GradientTextInput';
import { render } from '@testing-library/react';

describe('<GradientTextInput>', () => {
  it('renders the error message correctly', () => {
    const { queryByText } = render(
      <GradientTextInput errorMessage="Example error message" />
    );

    expect(queryByText('Example error message')).toBeTruthy();
  });
});
