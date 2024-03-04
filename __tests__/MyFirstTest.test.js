import MeApi from '../app/api/me-api'; // Adjust the path according to your file structure

// Mocking the global fetch function
global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
});

test('fetchDisplayName returns json on success', async () => {
    const mockJsonPromise = Promise.resolve({ displayName: 'John Doe' });
    const mockFetchPromise = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise,
    });
    fetch.mockImplementation(() => mockFetchPromise);

    const displayName = await MeApi.fetchDisplayName();
    expect(displayName).toEqual({ displayName: 'John Doe' });
    expect(fetch).toHaveBeenCalledTimes(1);
});

test('fetchDisplayName returns "try-error" on non-ok response', async () => {
    const mockFetchPromise = Promise.resolve({ ok: false });
    fetch.mockImplementation(() => mockFetchPromise);

    const result = await MeApi.fetchDisplayName();
    expect(result).toEqual("try-error");
    expect(fetch).toHaveBeenCalledTimes(1);
});

test('fetchDisplayName returns "catch-error" on fetch error', async () => {
    fetch.mockImplementation(() => Promise.reject("Network error"));

    const result = await MeApi.fetchDisplayName();
    expect(result).toEqual("catch-error");
    expect(fetch).toHaveBeenCalledTimes(1);
});
