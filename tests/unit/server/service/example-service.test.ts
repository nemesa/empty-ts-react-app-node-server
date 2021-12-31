import { ExampleService } from '../../../../src/server/services/example-service'

const sum = (new ExampleService).addNumbers
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});