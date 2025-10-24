import { render } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
	it('renders correctly', () => {
		const { container } = render(<Divider />);
		expect(container).toMatchSnapshot();
	});
});
