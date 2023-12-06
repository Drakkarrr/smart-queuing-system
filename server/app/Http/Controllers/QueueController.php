<?php

namespace App\Http\Controllers;

use App\Models\Queue;
use Illuminate\Http\Request;
use Carbon\Carbon;

class QueueController extends Controller
{
    public function get_que(Request $request) {
        $queType = $request->input('que_type');
        $accountNumber = $request->input('account_number');
    
        if ($queType == 'payment' && !$accountNumber) {
            return response()->json(['message' => 'Account number is required for payment queue'], 400);
        }
    
        $nextPriorityNumber = Queue::max('priority_number') + 1;
        $queueItem = Queue::create([
            'priority_number' => $nextPriorityNumber,
            'que_type' => $queType,
            'account_number' => $queType == 'payment' ? $accountNumber : null,
            'status' => 'pending'
        ]);
        
        // Calculate the estimated waiting time
        $estimatedWaitingTime = $this->calculateEstimatedWaitingTime();

        return response()->json([
            'queue_item' => $queueItem,
            'estimated_waiting_time' => $estimatedWaitingTime
        ]);
    }
    

    public function serving() {
        $currentItem = Queue::where('status', 'serving')->first();
        return response()->json($currentItem);
    }

    public function show_pending() {
        $pendingItems = Queue::where('status', 'pending')
                                 ->orderBy('priority_number', 'asc')
                                 ->take(5)
                                 ->get();
    
        return response()->json($pendingItems);
    }
    

    public function next() {
        $currentItem = Queue::where('status', 'serving')->first();
        $nextItem = Queue::where('status', 'pending')
                             ->orderBy('priority_number', 'asc')
                             ->first();

        if ($currentItem && $nextItem) {
            $nextItem->last_served_id = $currentItem->id;
            $currentItem->status = 'completed';
            $currentItem->done_at = now(); // Set the completion time
            $currentItem->save();

            $nextItem->status = 'serving';
            $nextItem->save();

            return response()->json($nextItem);
        }else if($nextItem){
            $nextItem->status = 'serving';
            $nextItem->save();

            return response()->json($nextItem);
        }

        return response()->json(['message' => 'No more items in queue']);
    }

    public function previous() {
        $currentItem = Queue::where('status', 'serving')->first();
        
        if ($currentItem && $currentItem->lastServed) {
            $currentItem->status = 'pending';
            $currentItem->save();
            
            $previousItem = $currentItem->lastServed;
            $previousItem->status = 'serving';
            $previousItem->done_at = null;
            $previousItem->save();

            return response()->json($previousItem);
        }

        return response()->json(['message' => 'No previous item available']);
    }

    public function resetQueue() {
        // Delete all items in the queue
        Queue::query()->delete();
    
        return response()->json(['message' => 'Queue has been completely reset']);
    }



    private function calculateEstimatedWaitingTime() {
        // Determine the average processing time of the last few served items
        $recentlyServedItems = Queue::whereNotNull('done_at')
                                        ->orderByDesc('done_at')
                                        ->take(5) // Example: taking the last 5 completed items
                                        ->get();

        if ($recentlyServedItems->isEmpty()) {
            return 'No data available to estimate waiting time';
        }

        $totalProcessingTime = 0;
        foreach ($recentlyServedItems as $item) {
            $doneAt = Carbon::parse($item->done_at); // Convert the string to a Carbon instance
            // $createdAt = Carbon::parse($item->created_at); // Ensure this is also a Carbon instance

            $processingTime = $doneAt->diffInSeconds($item->created_at);
            $totalProcessingTime += $processingTime;
        }

        $averageProcessingTime = $totalProcessingTime / $recentlyServedItems->count();

        // Count the number of items in the queue ahead of the new item
        $itemsAhead = Queue::where('status', 'pending')->count();

        // Estimate the waiting time
        $estimatedWaitingTime = $averageProcessingTime * $itemsAhead;

        // Convert seconds to a more readable format (e.g., minutes)
        return gmdate('i:s', $estimatedWaitingTime);
    }
}
