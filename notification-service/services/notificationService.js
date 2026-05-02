// In a real app, this would use nodemailer or similar.
// For now, it logs notifications to the console.

const sendNotification = ({ type, message, recipient }) => {
  const log = {
    type,
    message,
    recipient,
    timestamp: new Date().toISOString(),
  };
  console.log("[NOTIFICATION]", JSON.stringify(log));
  return log;
};

module.exports = { sendNotification };
