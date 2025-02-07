import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
       userId: v.string(),//clerkId
       email: v.string(),//email
       name: v.string(),//name
       isPro: v.boolean(),//premium or not
       proSince: v.optional(v.number()),//date of premium subscription
       lemonSqueezyCustomerId: v.optional(v.string()),//lemonSqueezy customer id
    }).index("by_user_id",["userId"]),

    codeExecutions: defineTable({
        userId: v.string(),
        language: v.string(),
        code: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string()),
      }).index("by_user_id", ["userId"]),

      snippets: defineTable({
        userId: v.string(),
        title: v.string(),
        language: v.string(),
        code: v.string(),
        userName: v.string(), // store user's name for easy access
      }).index("by_user_id", ["userId"]),
      
      snippetComments: defineTable({
        snippetId: v.id("snippets"),
        userId: v.string(),
        userName: v.string(),
        content: v.string(), // This will store HTML content
      }).index("by_snippet_id", ["snippetId"]),
    
      stars: defineTable({
        userId: v.string(),
        snippetId: v.id("snippets"),
      })
        .index("by_user_id", ["userId"])
        .index("by_snippet_id", ["snippetId"])
        .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),
});