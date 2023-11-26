import { renderWithContext } from '@newm.io/studio/common';
import GradientTextInput from '../GradientTextInput';

describe('<GradientTextInput>', () => {
  it('renders the error message correctly', () => {
    const { queryByText } = renderWithContext(
      <GradientTextInput errorMessage="Example error message" />
    );

    expect(queryByText('Example error message')).toBeTruthy();
  });
});
