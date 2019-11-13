export function getChatLog() {
  return Promise.resolve([{
    messageId: '12356',
    userId: '613651251',
    fullName: 'Robin Balmforth',
    timestamp: new Date().toISOString(),
    email: 'robin@example.com',
    message: 'Hello, World!',
    avatar: null
  }]);
};

export function getProfiles() {
  return Promise.resolve([{
    id: '12356',
    firstName: 'Robin',
    lastName: 'Balmforth',
    email: 'robin@example.com',
    avatar: 'abc.jpg',
    ip: "123.123.123.123"
  }]);
  
}
