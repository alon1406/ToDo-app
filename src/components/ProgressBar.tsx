import { motion } from 'framer-motion'

export interface ProgressBarProps {
  completed: number
  total: number
}

export const ProgressBar = ({ completed, total }: ProgressBarProps) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="progress-bar-wrap" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label="Tasks completed">
      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
      <span className="progress-bar-label">{completed} / {total} ({percentage}%)</span>
    </div>
  )
}
