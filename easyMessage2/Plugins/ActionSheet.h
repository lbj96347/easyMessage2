//
//  ActionSheet.h
//  
// Created by Olivier Louvignes on 11/27/2011.
// Added Cordova 1.5 support - @RandyMcMillan 2012
// Copyright 2011 Olivier Louvignes. All rights reserved.
// MIT Licensed


//#ifdef CORDOVA_FRAMEWORK

#import <Cordova/CDVPlugin.h>

@interface ActionSheet : CDVPlugin <UIActionSheetDelegate>  {
    
	NSString* callbackID;

}

@property (nonatomic, copy) NSString* callbackID;

//Instance Method  
- (void) create:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end