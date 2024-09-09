"use client"

import { UserSettings } from '@prisma/client';
import { startOfMonth } from 'date-fns';
import { useState } from 'react';

function Overview({ userSettings }: { userSettings: UserSettings }) {
    const [dateRange, setDateRange] = useState<{ form: Date; to: Date }>({
        form: startOfMonth(new Date()),
        to: new Date(),
    });
  return (
    <div>
      
    </div>
  )
}

export default Overview
