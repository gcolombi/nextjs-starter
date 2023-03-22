/**
 * Gets email template file
 * @param {string} host host name
 * @param {string} path email template path
 * @param {Object} res server response object
 * @returns {Object|JSON} html email template or JSON response
 */
export const getEmailTemplateFile = async (host, path, res) => {
    try {
        const response = await fetch(`http://${host}${path}`)
        if (!response.ok)
            throw new Error('Email template not found');
        return response.text();
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}