import Foundation

@objc public class Bixolon: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
