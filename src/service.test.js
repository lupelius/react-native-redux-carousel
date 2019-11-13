import { getChatLog, getProfiles } from './service';

// This is just a sample test to show you the desired format and fields, feel free to delete it.

it('getChatLog returns the correct format', () => {
  return getChatLog().then(([firstMessage]) => {
    expect(typeof firstMessage.messageId).toBe('string');
    expect(typeof firstMessage.userId).toBe('string');
    expect(typeof firstMessage.fullName).toBe('string');
    expect(typeof firstMessage.timestamp).toBe('string');
    expect(typeof firstMessage.email).toBe('string');
    expect(typeof firstMessage.message).toBe('string');
    expect(firstMessage.avatar === null || typeof firstMessage === 'string').toBeTruthy();
  });
});

it('getProfiles returns the correct format', () => {
  return getProfiles().then(([profile]) => {
    expect(typeof profile.id).toBe('string');
    expect(typeof profile.firstName).toBe('string');
    expect(typeof profile.lastName).toBe('string');
    expect(typeof profile.email).toBe('string');
    expect(typeof profile.avatar).toBe('string');
    expect(typeof profile.ip).toBe('string');
  });
});