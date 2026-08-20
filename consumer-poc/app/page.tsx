import { leoness } from '../lib/mock-leoness'
import { WineryProfile } from './WineryProfile'

export default function Page() {
  return <WineryProfile winery={leoness} />
}
