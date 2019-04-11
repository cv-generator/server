const { verify } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    const decoded = verify(req.headers.token)
    CV
        .findOne({ _id: req.params.CVId })
        .populate('UserId')
        .then((findOneCV) => {
            if (findOneCV.UserId.email === decoded.email) next()
            else res.status(401).json({ type: 'AUTHORIZATION ERROR', message: 'You do not have access to this page!' })
        })
}