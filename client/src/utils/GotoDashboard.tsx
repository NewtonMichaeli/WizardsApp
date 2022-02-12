// Redirect to Dashboard when Entering an unknown URL
import React from 'react'

// Redirect to dashboard (rendered as a legitimate jsx)
export const GoToDashboard: React.FC = () => <>{ window.location.href = '/dashboard' }</>
