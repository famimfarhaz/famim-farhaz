"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface VisitorLog {
  id: string
  ip_address: string
  user_agent: string
  device_type: string
  browser: string
  os: string
  is_bot: boolean
  visit_count: number
  first_visit: string
  last_visit: string
  page_url: string
  referer: string
}

export default function VisitorLogsPage() {
  const [logs, setLogs] = useState<VisitorLog[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVisitorLogs()
    fetchStats()
  }, [])

  const fetchVisitorLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('visitor_logs')
        .select('*')
        .order('last_visit', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error fetching logs:', error)
        return
      }

      setLogs(data || [])
    } catch (error) {
      console.error('Failed to fetch visitor logs:', error)
    }
  }

  const fetchStats = async () => {
    try {
      // Get basic stats
      const { data: statsData, error } = await supabase
        .from('visitor_logs')
        .select('*')

      if (error) {
        console.error('Error fetching stats:', error)
        return
      }

      // Calculate stats
      const totalVisitors = statsData?.length || 0
      const uniqueIPs = new Set(statsData?.map(log => log.ip_address)).size
      const botVisits = statsData?.filter(log => log.is_bot).length || 0
      const humanVisits = totalVisitors - botVisits

      // Device breakdown
      const deviceBreakdown = statsData?.reduce((acc: any, log) => {
        acc[log.device_type] = (acc[log.device_type] || 0) + 1
        return acc
      }, {}) || {}

      setStats({
        totalVisitors,
        uniqueIPs,
        botVisits,
        humanVisits,
        deviceBreakdown
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getBotBadge = (isBot: boolean) => {
    return isBot ? (
      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
        🤖 Bot
      </span>
    ) : (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
        👤 Human
      </span>
    )
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return '📱'
      case 'tablet': return '📟'
      case 'desktop': return '🖥️'
      case 'bot': return '🤖'
      default: return '❓'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading visitor logs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Visitor Analytics</h1>
          <p className="mt-2 text-gray-600">Monitor website visitors and security</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Visits</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalVisitors}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Unique IPs</h3>
              <p className="text-3xl font-bold text-green-600">{stats.uniqueIPs}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Human Visits</h3>
              <p className="text-3xl font-bold text-green-600">{stats.humanVisits}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Bot Visits</h3>
              <p className="text-3xl font-bold text-red-600">{stats.botVisits}</p>
            </div>
          </div>
        )}

        {/* Device Breakdown */}
        {stats?.deviceBreakdown && (
          <div className="bg-white rounded-lg shadow mb-8 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Device Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.deviceBreakdown).map(([device, count]) => (
                <div key={device} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">{getDeviceIcon(device)}</div>
                  <p className="text-sm font-medium text-gray-700 capitalize">{device}</p>
                  <p className="text-lg font-bold text-gray-900">{count as number}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visitor Logs Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Visitors</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Browser
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Agent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {log.ip_address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getBotBadge(log.is_bot)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="mr-2">{getDeviceIcon(log.device_type)}</span>
                        <span className="capitalize">{log.device_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {log.browser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {log.visit_count}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(log.last_visit)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {log.user_agent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {logs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No visitor logs found. Visitors will appear here once tracking starts.</p>
          </div>
        )}
      </div>
    </div>
  )
}