import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch latest guess colors
      const { data, error } = await supabase
        .from('guess_colors')
        .select('colors')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) throw error

      // Transform colors into a simpler format for Arduino
      // Assuming colors are like ['bg-green-400', 'bg-yellow-400', 'bg-black', etc]
      const simplifiedColors = data.colors.map((color: string) => {
        if (color.includes('green')) return 'G'
        if (color.includes('yellow')) return 'Y'
        return 'B' // black/wrong
      }).join('')

      res.status(200).json({ colors: simplifiedColors })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch colors' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
} 